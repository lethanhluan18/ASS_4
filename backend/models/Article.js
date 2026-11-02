const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Article title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Article content is required'],
      trim: true,
    },
    author: {
      type: String,
      default: 'Admin',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Article', articleSchema);

