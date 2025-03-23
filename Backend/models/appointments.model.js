const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: function () {
      return !this.block;
    },
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: function () {
      return !this.block; 
    },
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
  },
  reminder24Sent: {
    type: Boolean,
    default: false,
  },
  reminder1Sent: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
});

appointmentSchema.index({ date: 1, time: 1 }, { unique: true });
const Appointment = mongoose.model("appointments", appointmentSchema);

module.exports = Appointment;
