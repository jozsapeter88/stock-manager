const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  facility: { type: Schema.Types.ObjectId, ref: "Facility", required: true },
  items: [{ type: Schema.Types.ObjectId, ref: "Item", required: true }],
  quantity: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
