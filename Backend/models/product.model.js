const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, "please enter name"],

        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
    
    },
    {
      timestamps: true,  
    }

);

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product; 
