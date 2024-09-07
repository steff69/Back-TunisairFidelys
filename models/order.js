const mongoose = require('mongoose');


const OrderItemSchema = new mongoose.Schema(
    {
       
        foodtId: {
          type: mongoose.Schema.ObjectId,
          ref: 'Food',
         },
         
         additives: {
          type: Array,
         
         },
         instructions: {
          type: String,
          default : '',
          
         },
         quantity:{
          type:Number,
         
          default : 1
         },
         price:{
            type:Number,
            required : true 
           }
      
      
      
  
    },
    { timestamps: true }
  );
  


// 1- Create Schema
const OrderSchema = new mongoose.Schema(
  {
     
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Food',
       },
       usertId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
       },

       orderItems : [OrderItemSchema],
       orderTotal : {type:Number , required:true},
      deliveryFee : {type:Number , required:true},
      grandTotal : {type:Number , required:true},
      deliveryAddress : {
        type: mongoose.Schema.ObjectId,
        ref: 'Address',
      },
      restaurantAddress : {
        type:String , required:true
      },
      paymentMethod : {
        type:String , required:true
      },
      paymentStatus : {type:String , default:'pending', enum : ["Pending","Completed","Failed"] },

    
      orderStatus : {type:String , default:'pending', enum : ["Manual","Placed", "Accepted","Preparing","Delivered","Cancelled","Ready","Out_for_Delivery",] }

    ,restaurantId : {
        type: mongoose.Schema.ObjectId,
          ref: 'Restaurant',
    },
    restaurantCoords : [Number],
    recipientCoords : [Number],
    driverId : {type:String, default:''},
    rating : {type:Number , min:1 , max:5 , default:3},
    feedbackk : {type:String},
    promoCode : {  type:String  },
    discountAmount : {  type:Number  },
    notes : {type:String}



  },
  { timestamps: true }
);



// 2- Create model
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
