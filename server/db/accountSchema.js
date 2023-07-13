const mongoose = require("mongoose")
const { Schema } = mongoose;

const accountSchema = new Schema({
  name:  {type: String},
  userName: {type: String},
  passWord: String,
  hospitals: [{type: mongoose.SchemaTypes.ObjectId}]
});

module.exports = mongoose.model("Account", accountSchema, "accounts")