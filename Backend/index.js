const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/users.model.js");
const appointmentRoutes = require("./routes/appointments.routes");
const reviewRoutes = require("./routes/reviews.routes.js");
const userRoute = require("./routes/user.routes.js");
const emailRoutes = require("./routes/email.routes.js"); 
const projectRoutes = require("./routes/projects.routes.js");
const inProgressProjectRoutes = require("./routes/inProgressProjects.routes.js");
const contactUsRoutes = require("./routes/contactUs.routes.js");
const forgotPasswordEmailRoutes = require("./routes/forgotPassword.routes.js");
const resetPasswordRoutes = require("./routes/resetPassword.routes.js");
const createAccountEmailRoutes = require("./routes/createAccountEmail.routes.js");
const faqRoutes = require("./routes/faq.routes.js");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
require("./scheduler.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/users", userRoute);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/inProgressProjects", inProgressProjectRoutes);
app.use("/api/reviews", reviewRoutes);  
app.use("/api/emails",emailRoutes);
app.use("/api/contactUs", contactUsRoutes);
app.use("/api/forgotPasswordEmail", forgotPasswordEmailRoutes);
app.use("/api/resetPassword", resetPasswordRoutes);
app.use("/api/createAccountEmail", createAccountEmailRoutes);
app.use("/api/faq", faqRoutes);


app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});



mongoose.connect("mongodb+srv://josepepevas1280:ElGo9002!Joe@backenddb.7rqv6.mongodb.net/Node-APi?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
})
.catch(() =>{
console.log("connection failed");
});


