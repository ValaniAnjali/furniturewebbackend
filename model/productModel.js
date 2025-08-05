const mongoose = require('mongoose');

// Define your product schema
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    count: Number,
    imageUrl: String
});

// Create a model from the schema
const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;