const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'senior191work@gmail.com',
        pass: 'mbte pbzi qlsq ultp', // App password
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
    const { userEmail, userName, adminEmail, subject, userMessage, adminMessage } = req.body;

    // Validate required fields
    if (!userEmail || !userName || !adminEmail || !subject || !userMessage || !adminMessage) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        await transporter.sendMail({
            from: 'senior191work@gmail.com',
            to,
            subject,
            text,
        });
        

        // Send email to the admin
        await transporter.sendMail({
            from: 'senior191work@gmail.com',
            to: adminEmail || 'mkouiyoth45@gmail.com', // Use the provided adminEmail if available
            subject: `Admin Notification: ${subject}`,
            text: adminMessage,
        });


        console.log("Emails sent successfully!");
        return res.status(200).json({ message: "Emails sent successfully!" });
    } catch (error) {
        console.error("Error sending emails:", error);
        return res.status(500).json({ message: "Error sending emails", error });
    }
};

module.exports = { sendEmail };
