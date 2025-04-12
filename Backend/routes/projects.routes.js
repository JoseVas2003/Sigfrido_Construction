const express = require("express");
const router = express.Router();
const multer = require("multer");

const {getProjects, getProject, createProject, updateProject, deleteProject, getProjectImageByIndex, deleteProjectImage} = require("../controllers/projects.controllers.js");

// Multer ststorage to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Name fields for handling image updates
const multerFields = upload.fields([
    { name: "image_0", maxCount: 1 },
    { name: "image_1", maxCount: 1 },
    { name: "image_2", maxCount: 1 },
    { name: "image_3", maxCount: 1 },
    { name: "image_4", maxCount: 1 },
  ]);
router.get("/:id/images/:imageIndex", getProjectImageByIndex);
router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", upload.array("images", 5), createProject);
router.put("/:id", multerFields, updateProject);
router.delete("/:id", deleteProject);
router.delete("/:id/images/:imageIndex", deleteProjectImage);

module.exports = router;