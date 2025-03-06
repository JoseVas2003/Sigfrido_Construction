const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { createInProgressProject } = require("../controllers/inProgressProjects.controllers.js");

const router = express.Router();

router.post("/", upload.single("quote"), createInProgressProject);

module.exports = router;

