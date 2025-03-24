const express = require("express");
const ContactUs = require("../models/contactUs.model.js");
const router = express.Router();
const { 
    createMessage,
    deleteMessage,
    getMessage
 } = require('../controllers/contactUs.controllers.js');

// create contactUs object
router.post("/", createMessage);
router.get("/", getMessage);
router.delete("/:id", deleteMessage);

module.exports = router;