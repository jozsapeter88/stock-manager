const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountSchema = new Schema({
  name: String,
  userName: String,
  passWord: String,
});

module.exports = mongoose.model("Account", accountSchema, "accounts");
