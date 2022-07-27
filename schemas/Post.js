const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    writer: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    contents: {
      type: String,
      required: true,
    },
    password: {
      type: Number && String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;