const mongoose = require("mongoose");
const { Schema } = mongoose;

const facilitySchema = new Schema({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  country_code: { type: String, required: true },
  post_code: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  users: Array,
});

module.exports = mongoose.model("Facility", facilitySchema);
