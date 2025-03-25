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

const deleteMessage = async (req, res) => {
    try {
    const { id } = req.params;

    const contactUs = await ContactUs.findByIdAndDelete(id);

    if (!contactUs) {
      return res.status(404).json({ message: "Contact us form not found" });
    }

    res.status(200).json({ message: "Contact us form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

const getMessage = async (req, res) => {
    try {
      const contactUs = await ContactUs.find({});
      res.status(200).json(contactUs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    createMessage,
    deleteMessage,
    getMessage
};