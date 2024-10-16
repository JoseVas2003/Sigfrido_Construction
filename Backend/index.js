const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/users.model.js");
const userRoute = require("./routes/user.routes.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/users", userRoute);


app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});



mongoose.connect("mongodb+srv://josepepevas1280:ElGo9002!Joe@backenddb.7rqv6.mongodb.net/Node-APi?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
    console.log("Connected to database");
    app.listen(3000, () => {
    console.log('sever is running on port 3000')
});
})
.catch(() =>{
console.log("connection failed");
});


