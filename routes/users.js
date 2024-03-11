const mongoose = require('mongoose');
const plm = require("passport-local-mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/pinterest")

// Define the schema for the user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    // required: true
  },
  dp: {
    type: String,
    default: 'default_dp.jpg' // default profile picture
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId, // get the post id
    ref: 'Post' //this is the reference model
  }],
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    // unique: true
  }
});

// Create a model using the schema
userSchema.plugin(plm)
const User = mongoose.model('User', userSchema);

module.exports = User;

