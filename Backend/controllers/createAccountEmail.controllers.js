const nodemailer = require("nodemailer");

require("dotenv").config();

const createAccountEmailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    },
});

const verifyCreateAccountEmailTransporter = async () => {
    try {
        await createAccountEmailTransporter.verify();
        console.log("Create Account Email Transporter Is Ready.");
    } catch (error) {
        console.error("Error Verifying Create Account Email Transporter:", error);
    }
};
verifyCreateAccountEmailTransporter();

const sendEmail = async (req, res) => {
    const { email, firstName } = req.body;

    const createAccountEmail = {
        from: process.env.EMAIL,
        to: email, // Send to client
        subject: "Account Creation",
        text: `Hello ${firstName}!,

Welcome to Sigfrido Vasquez Construction!

This is a confirmation email for your account creation, if you have any questions or concerns please reach out to us.

Best regards,
Sigfrido Vasquez Construction


Please Do Not Reply To This Email, If You Have Any Questions Or Concernes, Please Reach Out To Us Through The Contact Us Page, Thank You.

        `,
    };

    try {
        // Send email to client
        await createAccountEmailTransporter.sendMail(createAccountEmail);

        console.log("Create Account Email Sent Successfully!");
        return res.status(200).json({ message: "Create Account Email Sent Successfully!" });
    } catch (error) {
        console.error("Error Sending Create Account Email:", error);
        return res.status(500).json({ message: "Error Sending Create Account Email", error });
    }
};

module.exports = { sendEmail };
