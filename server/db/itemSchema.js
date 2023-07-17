const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  name: String,
  sport: String,
  price: Number,
  quantity: Number,
});

module.exports = mongoose.model("Item", itemSchema);
