const express = require("express");
const User = require("../models/users.model.js");
const router = express.Router();
const { getUsers, getUser, createUser, updateUser, deleteUser, getUserByEmail, updateUserByEmail} = require('../controllers/users.controllers.js');


router.get('/', getUsers);
// Find User By Email: Used For Login Authentication
router.get("/:email", getUserByEmail);
router.post("/", createUser);
// update a user
router.put("/:email", updateUserByEmail);
// delete a user
router.delete("/:id", deleteUser);

module.exports = router;
