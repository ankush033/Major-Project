const mongoose = require("mongoose");
const initData = require("./data.js"); // ✅ array of listings
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to DB
mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ Connected to DB"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// Initialize DB
const initDB = async () => {
  try {
    // Delete all existing listings
    await Listing.deleteMany({});

    // Add owner field to each listing
    const listingsWithOwner = initData.map(obj => ({
      ...obj,
      owner: "68d671662f0638c84a09f63d", // ✅ valid ObjectId of a user
    }));

    // Insert all listings
    await Listing.insertMany(listingsWithOwner);

    console.log("✅ Data was initialized");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Initialization Error:", err);
  }
};

initDB();
