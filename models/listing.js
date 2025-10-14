const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
  title: String,
  description: String,
  image: { url: String, filename: String },
  price: Number,
  location: String,
  country: String,
  geometry: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: [Number],
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: {
    type: String,
    enum: [
      "Trending", "Rooms", "Iconic Cities", "Mountains", "Castles",
      "Amazing Pools", "Camping", "Farms", "Arctic", "Domes", "Boats",
      "Beachfront", "Desert", "Luxury", "Tiny Homes", "Countryside"
    ],
    default: "Trending"
  }
});

// 🧹 Delete reviews when listing is deleted
listingSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } });
  }
});

module.exports = mongoose.model("Listing", listingSchema);
