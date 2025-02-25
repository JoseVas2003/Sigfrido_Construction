const express = require("express");
const { sendLink } = require("../controllers/forgotPassword.controllers.js");

const router = express.Router();

// Route to send email
router.post("/sendLink", sendLink);

module.exports = router;
