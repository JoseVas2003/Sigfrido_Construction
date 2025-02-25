const ContactUs = require("../models/contactUs.model");

const createMessage = async (req, res) => {
    console.log("Recieved request to create message:", req.body);
    try{
        const contactUs = await ContactUs.create(req.body);
        res.status(200).json(contactUs);
    } catch(error) {
        res.status(500).json({message: error.message });
    }
};

module.exports = {
    createMessage
};