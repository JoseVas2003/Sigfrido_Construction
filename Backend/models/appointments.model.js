const mongoose = require("mongoose");


const appointmentSchema = new mongoose.Schema({
    date: { 
        type: Date,
        required: true },
    time: { 
        type: 
        String, required: true },
    email: {
        type:String,
        required: [true, "please enter your email"],
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", required: true },
    name: { 
        type: String, 
        required: true
    },
    phone: { 
        type: String, 
        required: true
    },
    description: { 
        type: 
        String },
    status: {
        type: String, default: "Pending" }, // e.g., Pending, Confirmed, Completed
});

const Appointment = mongoose.model("appointments", appointmentSchema);

module.exports = Appointment;