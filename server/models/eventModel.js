const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  organizerDetails: {
    type: String,
    required: true,
  },
  displayStatus: {
    type: Boolean,
    default: false,
    required: true,
  },
  eventImage: {
    type: String,
    required: true,
  },
  eventPoster: {
    type: String,
    required: true,
  },
});

const Events = mongoose.model("Events", eventSchema);
module.exports = Events;
