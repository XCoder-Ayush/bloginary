const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
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
  title:{
    type:String,
    required:true
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
  imageURL:{
    type: String,
    default:null
  },
  authorProfilePictureURL: {
    type: String,
    default: null
  },
  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  categories:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }]
},{timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;