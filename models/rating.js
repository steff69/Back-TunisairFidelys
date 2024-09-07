const mongoose = require('mongoose');
// 1- Create Schema
const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,

      
    },
    ratingType: {
      type: String,
      required: true,
      enum : ['Restaurant' ,'Driver' ,'Food' ]
      
    },
    value: {
      type: String,
      required: true,
      
    },
    product: {
      type: String,
      required: true,

      
    },
    rating: {
      type: Number,
     min:1,
     max:5

      
    },
    
   
  },
  { timestamps: true }
);


const rating = mongoose.model('rating', ratingSchema);

module.exports = rating;
