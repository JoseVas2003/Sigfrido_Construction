const mongoose = require('mongoose');

const ContactUsSchema = mongoose.Schema(
    {
        firstName:{
            type:String,
            required: [true, "please enter your first name"], },
        lastName:{
            type:String,
            required: [true, "please enter your last name"]
        },
        email:{
            type:String,
            required: [true, "please enter your email"],
        },
        phone:{
            type:String,
            required: [true, "please enter your phone number"],
        },
        subject:{
            type:String,
            required: [true, "please enter your desired subject"],
        },
        message:{
            type:String,
            required: [true, "please enter your desired message"],
        },
    },
    {
        timestamps: true,
    }
);

const ContactUs = mongoose.model("ContactUs", ContactUsSchema)

module.exports = ContactUs;