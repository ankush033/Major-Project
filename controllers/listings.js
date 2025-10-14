const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });

// 🆕 Render "New Listing" form
module.exports.renderNewForm = (req, res) => {
  return res.render("listings/new", { title: "Create New Listing" });
};

// 🏠 INDEX – All listings with categories
module.exports.index = async (req, res) => {
  const listings = await Listing.find({}).populate("owner");
  const categories = await Listing.distinct("category");

  return res.render("listings/index", {
    listings,
    categories,
    selectedCategory: null,
    title: "All Listings",
  });
};

// 🏷️ Category filter
module.exports.categoryFilter = async (req, res) => {
  const { categoryName } = req.params;
  const listings = await Listing.find({ category: categoryName }).populate("owner");
  const categories = await Listing.distinct("category");

  return res.render("listings/index", {
    listings,
    categories,
    selectedCategory: categoryName,
    title: `${categoryName} Listings`,
  });
};

// 🔍 Search listings
module.exports.search = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.redirect("/listings");

  const categories = await Listing.distinct("category");

  const listings = await Listing.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { location: { $regex: query, $options: "i" } },
    ],
  });

  return res.render("listings/index", {
    listings,
    categories,
    selectedCategory: null,
    title: `Search results for: ${query}`,
  });
};

// ➕ Create new listing
module.exports.create = async (req, res) => {
  const geoData = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (geoData.body.features.length > 0) {
    newListing.geometry = geoData.body.features[0].geometry;
  }

  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await newListing.save();
  req.flash("success", "New listing created!");
  return res.redirect(`/listings/${newListing._id}`);
};

// 🧾 Show listing details
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  return res.render("listings/show", { listing, title: listing.title });
};

// ✏️ Edit listing
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  return res.render("listings/edit", { listing, title: `Edit: ${listing.title}` });
};

// 🔄 Update listing
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  Object.assign(listing, req.body.listing);

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  if (req.body.listing.location) {
    const geoData = await geocodingClient
      .forwardGeocode({ query: req.body.listing.location, limit: 1 })
      .send();
    if (geoData.body.features.length > 0)
      listing.geometry = geoData.body.features[0].geometry;
  }

  await listing.save();
  req.flash("success", "Listing updated!");
  return res.redirect(`/listings/${listing._id}`);
};

// ❌ Delete listing
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted!");
  return res.redirect("/listings");
};
