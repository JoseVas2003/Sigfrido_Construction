const express = require("express");
const { sendEmail } = require("../controllers/createAccountEmail.controllers.js");

const router = express.Router();

// Route to send email
router.post("/sendEmail", sendEmail);

module.exports = router;
