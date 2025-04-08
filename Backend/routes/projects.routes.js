const express = require("express");
const User = require("../models/projects.model.js") // may not need this
const router = express.Router();
const multer = require("multer");

const {getProjects, getProject, createProject, updateProject, deleteProject, getProjectImageByIndex } = require("../controllers/projects.controllers.js");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/:id/images/:imageIndex", getProjectImageByIndex);
router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", upload.array("images", 5), createProject);
router.put("/:id", upload.array("images", 5), updateProject);
router.delete("/:id", deleteProject);

module.exports = router;