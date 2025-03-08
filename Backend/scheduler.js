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

       // Log the number of upcoming appointments found
       if (upcomingAppointments.length === 0) {
        console.log("No upcoming appointments found.");
      } else {
        console.log(`Found ${upcomingAppointments.length} upcoming appointment(s):`);
        upcomingAppointments.forEach(appointment => {
          console.log(`- Appointment ID: ${appointment._id}, Date: ${appointment.date}`);
        });
      }

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
