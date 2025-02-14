const express = require("express");
const { sendEmail } = require("../controllers/email.controllers.js");

const router = express.Router();

// Route to send email
router.post("/send", sendEmail);

module.exports = router;
