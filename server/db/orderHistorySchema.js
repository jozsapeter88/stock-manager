const mongoose = require("mongoose");

const OrderHistory = new mongoose.Schema(Object)

module.exports = mongoose.model("OrderHistory", OrderHistory, "orderHistory")


const OrderHistoryLegacy = new mongoose.Schema({
  date: Date,
  client: String, // name of the hospital
  invoiceData: {
      vendor_id: String,
      partner_id: Number,
      name: String,
      emails: [
        String
      ],
      block_id: Number,
      type: String,
      payment_method: String,
      currency: {type: String, uppercase: true},
      conversion_rate: {Type: Number, default: 1},
      electronic: Boolean,
      items: Array
  }
  })