const mongoose = require('mongoose');
// const Product = require('../models/productModel');
const productModel = require('../model/productModel')
module.exports.getProduct =async(req,res)=>{
        const _data= await productModel.find({})
        if(_data){
    return res.send(({code:200,message:"success",data:_data}))
        }else{
            return res.send({code:500,message:'server err'})
        }
}
module.exports.addProduct =async(req,res)=>{
    console.log(req.body,11)

    const title = req.body.title
    const description=req.body.description
    const price=req.body.price
    const count=req.body.count
    const imageUrl=req.file.path

    if(!title || !description || !price ||!count||!imageUrl){
        return res.send({code:400,message:'bad request'})
    }
    const newProduct = new productModel({ title:title ,description:description, price:price,count:count,imageUrl:imageUrl })
    const success= await newProduct.save()

    if (success){
        return res.send(({code:200,message:" add success"}))
    }else{
        return res.send({code:500,message:'server err'})
    }

}
// controller/productController.js
module.exports.getProductById = async (req, res) => {
    const { id } = req.params;

    // Check for valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID format" });
    }

    try {
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error("Error in getProductById:", error);
        res.status(500).json({ message: "Error fetching product", error });
    }
};
// DELETE a product
module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' });
    }

    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
};

// UPDATE a product
module.exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, price, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' });
    }

    const product = await productModel.findByIdAndUpdate(id, { title, price, description }, { new: true });
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
};
