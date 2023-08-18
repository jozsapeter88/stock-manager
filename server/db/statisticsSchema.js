const mongoose = require("mongoose");
const { Schema } = mongoose;

const statisticsSchema = new Schema({
  facilityName: { type: String, required: true },
  overallItems: { type: Number, required: true },
  overallValue: { type: Number, required: true },
});

module.exports = mongoose.model("Statistics", statisticsSchema);