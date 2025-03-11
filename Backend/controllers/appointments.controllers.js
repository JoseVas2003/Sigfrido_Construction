const Appointment = require("../models/appointments.model");
const { sendAppointmentConfirmation } = require("../controllers/email.controllers");

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAppointment = async (req, res) => {
  try {
    const { email } = req.params;
    const appointment = await Appointment.find({email});

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAppointment = async (req, res) => {
  try {
    const { date, time, ...rest } = req.body;
    
    const appointmentDate = new Date(date);
    
    const [timePart, period] = time.split(" ");
    const [hourStr, minuteStr] = timePart.split(":");
    let hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);
    
    if (period && period.toLowerCase() === "pm" && hours < 12) {
      hours += 12;
    } else if (period && period.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }
    
    appointmentDate.setUTCHours(hours, minutes, 0, 0);
    
    const appointment = await Appointment.create({
      date: appointmentDate,
      time,
      ...rest,
    });
    
    await sendAppointmentConfirmation(appointment);

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // If the scheduler sends reminder flag keys, map them to the model fields.
    if (updateData.reminder1set !== undefined) {
      updateData.reminder1Sent = updateData.reminder1set;
      delete updateData.reminder1set;
    }
    if (updateData.reminder24set !== undefined) {
      updateData.reminder24Sent = updateData.reminder24set;
      delete updateData.reminder24set;
    }

    if (updateData.status === "Approved") {
      console.log("Appointment status set to Approved");
    }

    const appointment = await Appointment.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    console.log("Updated appointment:", appointment);
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};