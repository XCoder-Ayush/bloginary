const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  blogs:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Blog"
  }],
},{timestamps: true});

const Category = mongoose.model('Category', categorySchema);


module.exports = Category;
