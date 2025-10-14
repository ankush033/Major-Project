const express = require("express");
const router = express.Router();
const ListingController = require("../controllers/listings");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

// 🟢 New Listing Form Route — must come BEFORE "/:id"
router.get("/new", isLoggedIn, wrapAsync(ListingController.renderNewForm));

// All listings + Create
router
  .route("/")
  .get(wrapAsync(ListingController.index))
  .post(
    isLoggedIn,
    upload.single("image"),
    validateListing,
    wrapAsync(ListingController.create)
  );

// Category filter
router.get("/category/:categoryName", wrapAsync(ListingController.categoryFilter));

// Search
router.get("/search", wrapAsync(ListingController.search));

// Show, Update, Delete
router
  .route("/:id")
  .get(wrapAsync(ListingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"),
    validateListing,
    wrapAsync(ListingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(ListingController.deleteListing));

// Edit form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.renderEditForm));

module.exports = router;
