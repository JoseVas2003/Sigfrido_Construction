const User = require("../models/users.model");


const updateUserByToken = async (req, res) => {
    try {
      const { token } = req.params;
  
      const user = await User.findOneAndUpdate({token}, req.body);
  
      if (!user) {
        return res.status(404).json({ message: "User not found by token" });
      }
  
      const updatedUser = await User.findOne({token});
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {
    updateUserByToken,
  };
  