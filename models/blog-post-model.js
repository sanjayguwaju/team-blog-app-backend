const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['technology', 'lifestyle', 'travel', 'others'],
    default: 'others'
  },
  tags: {
    type: [String],
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: [String],
    default: []
  },
  disLikes: {
    type: [String],
    default: []
  }
});

blogPostSchema.index({ title: 'text', content: 'text' });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;