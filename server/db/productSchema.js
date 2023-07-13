const mongoose = require("mongoose");

const Product = new mongoose.Schema({
    name: String,
    id: Number,
    price: Number,
    quantity: Number
});

module.exports = mongoose.model("Product", Product);