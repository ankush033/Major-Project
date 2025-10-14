const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

// Add username + password automatically with passport-local-mongoose
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
