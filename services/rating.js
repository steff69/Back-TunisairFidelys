



const Restaurant = require('../models/restaurant');
const Food = require('../models/Food');

const Rating = require('../models/rating');



module.exports ={

addRating : async (req,res)=>{

    
    const newRating =new Rating ({ userId : req.body.rating,
        ratingrype: req. body.rating,
        product: req.body.product,
        rating: req.body.rating}); 

    

    


    try {
       
        await newRating.save();

     if ( req.body.ratingType === "Restaurant")
          { 
            let restaurants = await Rating.aggregate([{$match: {ratingType:req.body.ratingType ,product: req.body.product }},
            {$group: {_id:'$product'},averateRating : {$avg : '$rating'}}]);
            
             if(restaurants>0){
            const averateRating = restaurants[0].averateRating;
          await Restaurant.findByIdAndUpdate(req.body.product,{rating: averateRating},{new:true})


             }
           }else if (req.body.ratingType === "Food"){

            let foods = await Rating.aggregate([{$match: {ratingType:req.body.ratingType ,product: req.body.product }},
                {$group: {_id:'$product'},averateRating : {$avg : '$rating'}}]);
                
                 if(foods>0){
                const averateRating = foods[0].averateRating;
              await Food.findByIdAndUpdate(req.body.product,{rating: averateRating},{new:true})
    
    
                 }
           }

         res.status(201).json({ status: true, message: "Raiting Created successfully" });

       }
   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }
   



},
checkUserRating: async (req , res)=>{

   const ratingType= req.body.ratingType
   const product= req.body.product


    try {

    
         const Erating = await Rating.findOne({
            userId : req.user.id ,
            product:product,
            ratingType:ratingType
         }) 

         if(Erating){
            res.status(200).json({DATA:Erating , message : "you have already rated " });
         }

        res.status(200).json({ message : "you has not rated" });
      
      }

   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }
   



},

}