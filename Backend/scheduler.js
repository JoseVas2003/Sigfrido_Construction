const cron = require("node-cron");
const Appointment = require("./models/appointments.model");
const { sendReminderEmail } = require("./controllers/email.controllers");

cron.schedule("*/2 * * * *", async () => {
  console.log("Scheduler job triggered at", new Date());

  try {
    const now = new Date();
    const upcomingAppointments = await Appointment.find({
      date: { $gte: now },
    });

    if (upcomingAppointments.length === 0) {
      console.log("No upcoming appointments found.");
    } else {
      console.log(`Found ${upcomingAppointments.length} upcoming appointment(s):`);
      upcomingAppointments.forEach(appointment => {
        console.log(`- Appointment ID: ${appointment._id}, Date: ${appointment.date}`);
      });
    }

    for (const appointment of upcomingAppointments) {
      const appointmentTime = new Date(appointment.date).getTime();
      const diff = appointmentTime - now.getTime();
      const diffHours = diff / (1000 * 60 * 60);

      // Send a 24-hour reminder if it's between 1 and 24 hours away and not already sent
      if (diffHours > 1 && diffHours <= 24 && !appointment.reminder24Sent) {
        await sendReminderEmail(appointment, 24);
        appointment.reminder24Sent = true;
        await appointment.save(); // Update the appointment in the database
      }
      
      // Send a 1-hour reminder if it's between 0 and 1 hours away and not already sent
      if (diffHours > 0 && diffHours <= 1 && !appointment.reminder1Sent) {
        await sendReminderEmail(appointment, 1);
        appointment.reminder1Sent = true;
        await appointment.save(); // Update the appointment in the database
      }
    }
  } catch (error) {
    console.error("Error in scheduler:", error);
  }
});