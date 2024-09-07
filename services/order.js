



const Restaurant = require('../models/restaurant');
const Food = require('../models/Food');

const Order = require('../models/order');



module.exports ={

addOrder : async (req,res)=>{

    
    const newOrder =new Order ({ userId : req.body.id,
        ...req.body}); 

    

    


    try {
       
        await newOrder.save();

     
         res.status(201).json({ status: true, message: "order Created successfully" , id :newOrder.id });

       }
   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }
   



},
getUserOrders: async (req , res)=>{
   
   const userId= req.body.id

   const { paymentStatus ,orderStatus } = req.query;

   let query = {userId}
 

    try {

        if(paymentStatus){
            query.paymentStatus = paymentStatus;
        }
        if(orderStatus===orderStatus){
            query.orderStatus = orderStatus;
        }

        const orders = await Order.find({query}).populate({
            path:'orderitems',
            select : "imageUrl title rating time "
            
        })

    

        res.status(200).json({ orders });
      
      }

   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }
   



},


}