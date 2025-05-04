const nodemailer = require("nodemailer");

require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    },
});

const verifyTransporter = async () => {
    try {
        await transporter.verify();
        console.log("Email transporter is ready.");
    } catch (error) {
        console.error("Error verifying transporter:", error);
    }
};
verifyTransporter();

//sends appointment confirmation email to the client
const sendAppointmentConfirmation = async (appointment) => {
    const formattedDate = new Date(appointment.date).toLocaleDateString();
  
    const clientMailOptions = {
      from: process.env.EMAIL,
      to: appointment.email, // client's email address
      subject: "Your Appointment Request Received",
      text: `Hello ${appointment.name},
  
  Thank you for scheduling an appointment. Your request is currently marked as "Pending".
  
  Here are the details:
  Date: ${formattedDate}
  Time: ${appointment.time}
  
  You can view your appointment details on your dashboard.
  
  Best regards,
  Sigfrido Vasquez
  Owner, Construction Services`,
    };
  
    try {
      await transporter.sendMail(clientMailOptions);
      console.log("Appointment confirmation email sent to client.");
    } catch (error) {
      console.error("Error sending appointment confirmation email:", error);
    }
  };
  
  //sends reminder emails for upcoming appointments to admin
  const sendReminderEmail = async (appointment, hoursBefore) => {
    const formattedDate = new Date(appointment.date).toLocaleDateString();
  
    const adminMailOptions = {
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `Upcoming Appointment Reminder: ${hoursBefore} Hour(s) Notice`,
      text: `Reminder: You have an upcoming appointment request from a client.
  Client: ${appointment.name}
  Email: ${appointment.email}
  Date: ${formattedDate}
  Time: ${appointment.time}
  Message:
  ${appointment.message}
  
  This appointment is in approximately ${hoursBefore} hour(s).`,
    };
  
    try {
      await transporter.sendMail(adminMailOptions);
      console.log(`Reminder email sent for appointment ${appointment._id}`);
    } catch (error) {
      console.error("Error sending reminder email:", error);
    }
  };  

const sendEmail = async (req, res) => {
    const { name, email, phone, message, date, time } = req.body;

    // Validate required fields
    if (!name || !email || !date || !time || !message || !phone) {
        console.error("Missing field! Request body:", req.body); // Log the missing data
        return res.status(400).json({ message: "Missing required fields.", receivedData: req.body });
    }


    const formattedDate = new Date(date).toLocaleDateString();

    const clientMailOptions = {
        from: process.env.EMAIL,
        to: email, // Send to client
        subject: "Your Appointment Confirmation",
        text: `Hello ${name},

Thank you for scheduling an appointment.

Here are the details:
Date: ${formattedDate}
Time: ${time}

We look forward to speaking with you!

Best regards,
Sigfrido Vasquez
Owner, Construction Services
        `,
    };
    const adminMailOptions = {
        from: process.env.EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: "New Appointment Scheduled",
        text: `New appointment booked!

Client: ${name}
Email: ${email}
Phone: ${phone}
Date: ${formattedDate}
Time: ${time}
Message: ${message}

Please review and confirm with the client.
        `,
    };
    try {
        // Send email to client
        await transporter.sendMail(clientMailOptions);

        // Send email to admin
        await transporter.sendMail(adminMailOptions);

        console.log("Emails sent successfully!");
        return res.status(200).json({ message: "Emails sent successfully!" });
    } catch (error) {
        console.error("Error sending emails:", error);
        return res.status(500).json({ message: "Error sending emails", error });
    }
};

const sendCancellationEmail = async (req, res) => {
  const { name, email,  date, time } = req.body;

  if (!name || !email || !date || !time ) {
      return res.status(400).json({ message: "Missing required fields.", receivedData: req.body });
  }
  
  const formattedDate = new Date(date).toLocaleDateString();

  const clientMailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your Appointment Cancellation",
      text: `Hello ${name},

Your appointment scheduled for:
Date: ${formattedDate}
Time: ${time}

Has been canceled.

If you have any questions or need to reschedule, feel free to contact us.

Best regards,
Sigfrido Vasquez
Owner, Construction Services`,
  };

  const adminMailOptions = {
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "Appointment Cancellation Notice",
      text: `An appointment has been canceled.

Client: ${name}
Email: ${email}
Date: ${formattedDate}
Time: ${time}

Please update your records accordingly.`,
  };

  try {
      await transporter.sendMail(clientMailOptions);
      await transporter.sendMail(adminMailOptions);
      console.log("Cancellation emails sent successfully!");
      return res.status(200).json({ message: "Cancellation emails sent successfully!" });
  } catch (error) {
      console.error("Error sending cancellation emails:", error);
      return res.status(500).json({ message: "Error sending cancellation emails", error });
  }
};

const sendRescheduleEmail = async (req, res) => {
  const { name, email, message, originalDate, originalTime, newDate, newTime } = req.body;

  if (!name || !email || !originalDate || !originalTime || !newDate || !newTime) {
    console.error("Missing required fields for reschedule email:", req.body);
    return res.status(400).json({ message: "Missing required fields.", receivedData: req.body });
  }

  const formattedOriginalDate = new Date(originalDate).toLocaleDateString();
  const formattedNewDate = new Date(newDate).toLocaleDateString();

  const clientMailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your Appointment Has Been Rescheduled",
    text: `Hello ${name},

Your appointment has been successfully rescheduled.

Original Appointment:
Date: ${formattedOriginalDate}
Time: ${originalTime}

New Appointment:
Date: ${formattedNewDate}
Time: ${newTime}

If you have any questions or concerns, feel free to contact us.

Best regards,
Sigfrido Vasquez
Owner, Construction Services`,
  };

  const adminMailOptions = {
    from: process.env.EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: "Client Rescheduled Appointment",
    text: `Client Rescheduled Appointment:

Client: ${name}
Email: ${email}

Original:
Date: ${formattedOriginalDate}
Time: ${originalTime}

New:
Date: ${formattedNewDate}
Time: ${newTime}

Message: ${message || "No additional message"}

Please confirm the new appointment time.`,
  };

  try {
    await transporter.sendMail(clientMailOptions);
    await transporter.sendMail(adminMailOptions);
    console.log("Reschedule emails sent.");
    return res.status(200).json({ message: "Reschedule emails sent successfully!" });
  } catch (error) {
    console.error("Error sending reschedule emails:", error);
    return res.status(500).json({ message: "Error sending reschedule emails", error });
  }
};


module.exports = { sendEmail, sendAppointmentConfirmation, sendReminderEmail, sendCancellationEmail,sendRescheduleEmail, };