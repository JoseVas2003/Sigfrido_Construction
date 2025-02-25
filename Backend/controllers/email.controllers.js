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

const sendEmail = async (req, res) => {
    const { name, email, phone, message, date, time } = req.body;

    // Validate required fields
    if (!name || !email || !date || !time || !message || !phone) {
        console.error("Missing field! Request body:", req.body); // Log the missing data
        return res.status(400).json({ message: "Missing required fields.", receivedData: req.body });
    }


    const formattedDate = new Date(date).toLocaleDateString();

    const clientMailOptions = {
        from: 'senior191work@gmail.com',
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
        to: 'senior191work@gmail.com',// Admin email (change it)
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

module.exports = { sendEmail };
