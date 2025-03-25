const express = require("express");
const { sendEmail,
    sendCancellationEmail, 
    sendRescheduleEmail
} = require("../controllers/email.controllers.js");

const router = express.Router();

// Route to send email
router.post("/send", sendEmail);
router.post("/cancel",sendCancellationEmail);
router.post("/reschedule",sendRescheduleEmail);
module.exports = router;
