const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  authorFirstName: {
    type: String,
    required: true
  },
  authorLastName: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: [{
    type: String,
    required: true,
    default: []
  }],
  authorProfilePictureURL: {
    type: String,
    default: null
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog"
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;