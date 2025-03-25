const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { createInProgressProject,getInProgressProjects,updateInProgressProject,getUsersProjects } = require("../controllers/inProgressProjects.controllers.js");

const router = express.Router();

router.post("/", upload.single("quote"), createInProgressProject);
router.get("/", getInProgressProjects);
router.put("/:id", updateInProgressProject);
router.get("/:email", getUsersProjects);

module.exports = router;

