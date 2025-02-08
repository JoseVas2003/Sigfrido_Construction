const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        firstName:{
            type:String,
            required: [true, "please enter your first name"], },
        lastName:{
            type:String,
            required: [true, " pleas enter your last name"]
        },
        email: {
            type:String,
            required: [true, "please enter your email"],
        }, 
        phone: {
            type:String,
            required: [true, "please enter your phone number"],
        },
        password:{
            type:String,
            required: [true, "please enter a password"],
        },
        admin:{
            type:Boolean,
            required: [true],
        },
       
    
    },
    {
      timestamps: true,  
    }

);

const User = mongoose.model("User", UserSchema)

module.exports = User; 
