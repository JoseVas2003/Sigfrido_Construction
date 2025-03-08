const express = require("express");
const User = require("../models/users.model.js");
const router = express.Router();
const { updateUserByToken } = require('../controllers/resetPassword.controllers.js');


router.put("/:token", updateUserByToken);

module.exports = router;