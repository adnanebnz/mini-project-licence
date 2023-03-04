const mongoose = require("mongoose");
const PinSchema = new mongoose.Schema(
  {
    organizer: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
      min: 3,
    },
    desc: {
      type: String,
      require: true,
      min: 3,
    },
    rating: {
      type: Number,
      require: true,
      min: 0,
      max: 5,
    },
    lat: {
      type: Number,
      require: true,
    },
    long: {
      type: Number,
      require: true,
    },
    level: {
      type: String,
      require: true,
    },
    places: {
      type: Number,
      require: true,
    },
    duration: {
      type: Number,
      require: true,
      default: 1,
    },
    price: {
      type: Number,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },

    //TODO: WEATHER AND DATE how many people will come familial or friends organizer also organizer profile and skills how many males and females in a single hiking stuff to bring for the hike like foods and utilities PLACE TO MEET TO START THE HIKE
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);
