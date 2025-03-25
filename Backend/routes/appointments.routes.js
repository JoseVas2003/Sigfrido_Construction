const express = require("express");
const {
  getAppointments,
  getAppointment,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointments.controllers.js");

const router = express.Router();

router.get("/", getAppointments);
router.get("/:email", getAppointment);
router.get("/id/:id", getAppointmentById);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
