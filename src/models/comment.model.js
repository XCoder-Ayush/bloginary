const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
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
  likeCount: {
    type: Number,
    required: true,
    default:0
  },
  authorProfilePictureURL: {
    type: String,
    default: null
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog"
  },
},{timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);


module.exports = Comment;
