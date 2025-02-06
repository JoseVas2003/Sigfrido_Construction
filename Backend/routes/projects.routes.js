const express = require("express");
const router = express.Router();
const multer = require("multer");

const {getProjects, getProject, createProject, updateProject, deleteProject, getProjectImage} = require("../controllers/projects.controllers.js");

const storage = multer.memoryStorage();
const upload = multer({ storage });
router.get("/:id/image", getProjectImage);
router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", upload.single("image"), createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;