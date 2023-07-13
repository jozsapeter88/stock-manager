const mongoose = require("mongoose")
const { Schema } = mongoose;

const hospitalSchema = new Schema({
  name:  {type: String, required: true},
  country_code: {type: String, required: true},
  post_code: {type: String, required: true},
  city: {type: String, required: true},
  address: {type: String, required: true},
  partner_id: String,
  users: Array,
});

module.exports = mongoose.model("Facility", facilitySchema);