const nodemailer = require("nodemailer");

require("dotenv").config();

const forgotPasswordTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    },
});

const verifyForgotPasswordTransporter = async () => {
    try {
        await forgotPasswordTransporter.verify();
        console.log("Forgot Password Email Transporter Is Ready.");
    } catch (error) {
        console.error("Error Verifying Forgot Password Transporter:", error);
    }
};
verifyForgotPasswordTransporter();

const sendLink = async (req, res) => {
    const { email, token, name } = req.body;

    const forgotPasswordEmail = {
        from: process.env.EMAIL,
        to: email, // Send to client
        subject: "Password Reset",
        text: `Hello ${name}!,

Please Follow This Link To Reset Your Password.    

https://sigfridocontracting.com/resetPassword/${token}

Best regards,
Sigfrido Vasquez Construction


Please Do Not Reply To This Email, If You Have Any Questions Or Concernes, Please Reach Out To Us Through The Contact Us Page, Thank You.

        `,
    };

    try {
        // Send email to client
        await forgotPasswordTransporter.sendMail(forgotPasswordEmail);

        console.log("Forgot Password Email Sent Successfully!");
        return res.status(200).json({ message: "Forgot Password Email Sent Successfully!" });
    } catch (error) {
        console.error("Error Sending Forgot Password Email:", error);
        return res.status(500).json({ message: "Error Sending Forgot Password Email", error });
    }
};

module.exports = { sendLink };
