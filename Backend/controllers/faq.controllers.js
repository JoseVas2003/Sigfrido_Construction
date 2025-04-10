const FaqItem = require("../models/faq.model");

const getAllFaqItems = async (req, res) => {
    try {
        const items = await FaqItem.find().sort({ position: 1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const saveFaqItems = async (req, res) => {
    try {
      const items = req.body;
  
      if (!Array.isArray(items)) {
        return res.status(400).json({ message: "Expected an array of FAQ items." });
      }
  
      // Assign position field based on current order
      const orderedItems = items.map((item, index) => ({
        ...item,
        position: index,
      }));
  
      await FaqItem.deleteMany({});
      await FaqItem.insertMany(orderedItems);
  
      res.json({ message: "FAQ items saved successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };  

module.exports = {
    getAllFaqItems,
    saveFaqItems,
};
