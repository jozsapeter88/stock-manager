const mongoose = require("mongoose");
const { Schema } = mongoose;

const shippedItemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("ShippedItem", shippedItemSchema);
