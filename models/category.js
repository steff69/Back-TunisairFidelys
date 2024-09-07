const mongoose = require('mongoose');
// 1- Create Schema
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Category required'],
      
    },
    value: {
      type: String,
      required: [true, 'Category required'],
      
    },
    
    imageUrl: String,
  },
  { timestamps: true }
);


const Category = mongoose.model('category', categorySchema);

module.exports = Category;
