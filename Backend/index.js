const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express()

app.use(express.json());

app.get('/', (req, res)=>{
    res.send("hello from node api updated");
});


app.post('/api/products',async (req, res)=>{
  try {
    const product= await Product.create(req.body);
    res.status(200).json(product);
  } catch(error){
    res.status(500).json({messag:error.message});
  }
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


