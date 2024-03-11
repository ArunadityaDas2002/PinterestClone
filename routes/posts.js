const mongoose = require('mongoose');

// Define the schema for the post
const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, //get the user id
    ref: 'user' // this is the reference model
  },
  image : {
    type: String,
  },
  likes: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model using the schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
