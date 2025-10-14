// Load environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");

// Models
const User = require("./models/user");

// Routes
const listingRoutes = require("./routes/listing");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/user");

const ExpressError = require("./utils/expressError");

// ✅ Connect to MongoDB Atlas
const dbUrl = process.env.ATLASDB_URL;

mongoose
  .connect(dbUrl)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Atlas Connection Error:", err));

// View engine setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


app.use(flash());

const store = MongoStore.create({
  mongoUrl : dbUrl,
  crypto : {
    secret:"process.env.SECRET"
  },
  touchAfter : 24*3600
  
});


// ✅ Session Configuration
const sessionConfig = {
  store,
  secret: process.env.SECRET ,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
  },
};
app.use(session(sessionConfig));

// ✅ Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ✅ Flash and locals middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  res.locals.MAP_TOKEN = process.env.MAP_TOKEN || "";
  next();
});

// ✅ Routes
app.use("/", userRoutes);
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);

// Root redirect
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// 404 handler
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  res.status(statusCode).render("error", {
    err: { statusCode, message },
    title: "Error",
  });
});

// ✅ Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
