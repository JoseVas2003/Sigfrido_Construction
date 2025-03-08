const express = require("express");
const User = require("../models/projects.model.js") // may not need this
const router = express.Router();
const multer = require("multer");

const {getProjects, getProject, createProject, updateProject, deleteProject, getProjectImage} = require("../controllers/projects.controllers.js");

const storage = multer.memoryStorage();
const upload = multer({ storage });
router.get("/:id/image", getProjectImage);
router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", upload.single("image"), createProject);
router.put("/:id", upload.single("image"), updateProject);
router.delete("/:id", deleteProject);

module.exports = router;