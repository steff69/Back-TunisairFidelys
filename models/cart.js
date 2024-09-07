const mongoose = require('mongoose');
// 1- Create Schema
const cartSchema = new mongoose.Schema(
  {
     
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Food',
       },
       usertId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
       },
       additives: {
        type: Array,
        required : false,
        default : []
       },
       totalPrice: {
        type: Number,
        required : true,
        
       },
       quantity:{
        type:Number,
        required : true 
       }
    
    
    

  },
  { timestamps: true }
);



// 2- Create model
const cart = mongoose.model('Cart', cartSchema);

module.exports = cart;
