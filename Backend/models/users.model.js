const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, "please enter your name"],

        },
        email: {
            type:String,
            required: [true, "please enter your email"],
        },
        address:{
            type:String,
            required: [true, "please enter your address"],

        },
        Phone: {
            type:String,
            required: [true, "please enter your phone number"],
        },
    
    },
    {
      timestamps: true,  
    }

);

const User = mongoose.model("User", UserSchema)

module.exports = User; 
