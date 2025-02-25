const cron = require("node-cron");
const Appointment = require("./models/appointments.model");
const { sendReminderEmail } = require("./controllers/email.controllers");

cron.schedule("*/10 * * * *", async () => {
  try {
    const now = new Date();
    const upcomingAppointments = await Appointment.find({
      date: { $gte: now },
    });

    upcomingAppointments.forEach(async (appointment) => {
      const appointmentTime = new Date(appointment.date).getTime();
      const diff = appointmentTime - now.getTime();
      const diffHours = diff / (1000 * 60 * 60);

      if (diffHours > 0 && diffHours <= 1) {
        await sendReminderEmail(appointment, 1);
      }
      else if (diffHours > 1 && diffHours <= 24) {
        await sendReminderEmail(appointment, 24);
      }
    });
  } catch (error) {
    console.error("Error in scheduler:", error);
  }
});
