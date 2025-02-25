const express = require("express");
const ContactUs = require("../models/contactUs.model.js");
const router = express.Router();
const { createMessage } = require('../controllers/contactUs.controllers.js');

// create contactUs object
router.post("/", createMessage);

module.exports = router;