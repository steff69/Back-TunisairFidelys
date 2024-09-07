

const Food = require('../models/Food');

module.exports={

addFood: async ( req,res )=>{


    const {title, foodTags, category, code, restaurant, description, time, price, additives, imageUrl}= req.body;

          
             
            
             if ( ! title ||! foodTags || !category || ! restaurant || !description || !time || !price || !additives ||! imageUrl )
{             return res.status(400).json({ status: false, message: "You have a missing field" })}
             try {


                const newfood =new Food( req.body)  ;
                await newfood.save()                  
                    res.status(201).json({ status: false, message: "Food has been successfully ad" })
                   
             }
             catch (error) {

       res.status(500).json({status:false, message: error.message});

             }
},
getFoodById : async ( req,res )=>{
   const id =req.params.id ;


   try {


    const food = await Food.findById(id) ;
                   
        res.status(200).json(food)
       
 }
 catch (error) {

res.status(500).json({status:false, message: error.message});

 }

},
getRandomFood : async ( req,res )=>{


    const code =req.params.code ;


        console.log(code)




    try {

        let foods ;
        if (code) {
            foods = await Food.aggregate([{$match:{code: code, isAvailabte: true}},
         {$sample: {size:5}},
        
        {$project: { __v: 0}},]);};

        console.log(foods)
        
        if (foods.length==0) {
            foods=await Food.aggregate( I
                [{$match: { isAvailabte: true}},
                  {$sample: {size:5}},
              
               {$project: { __v: 0}}])
            }
        
            res.status(200).json({Result:foods.length,data:foods});
           
     }
     catch (error) {
    
    res.status(500).json({status:false, message: error.message});
    
     }

},

getFoodByCategoryAndCode : async ( req,res )=>{


    const {code ,category} =req.params ;




    try {

        let foods ;

        if (code) {
            foods = await Food.aggregate([{$match: {code: code, category:category}},
        
        
        {$project: { __v: 0}},]);};
        
        if (foods.length==0) {

            return res.status(200).json({ Result:0,data:[]});

            
            }
        
            res.status(200).json({ Result:foods.length,data:foods});
           
     }
     catch (error) {
    
    res.status(500).json({status:false, message: error.message});
    
     }

},

getFoodByRestaurant : async ( req,res )=>{

    const id =req.params.id ;
    console.log(id)


    try {
 
 
     const foods = await Food.find({restaurant: id}) ;
     console.log(foods)
                    
         res.status(200).json(foods)
        
  }
  catch (error) {
 
 res.status(500).json({status:false, message: error.message});
 
  }

},

searchFood : async ( req,res )=>{

    
    const search =req.params.search ;

       let query ;


    try {
 // const results = await Food.aggregate([{$search:{ index:'foods', text:{ query:search, path : {wildcard : "*"}}}},
        // ]);


         query = { title: { $regex: search, $options: 'i' } };
        
         const results = await Food.find(query)

         if (results.length >0)
          {  res.status(200).json(results);}else{
            res.status(201).json(results)
          }
           
     }
     catch (error) {
    
    res.status(500).json({status:false, message: error.message});
    
     }

},

getRandomFoodsByCategoryAndCode: async ( req,res )=>{


   
    try {

        

       
        const foods = await Food.find({});
     
     
     
    
     
     
     
         res.status(200).json({ Result:foods.length,data:foods});
        
  }
  catch (error) {
 
 res.status(500).json({status:false, message: error.message});
 
  }

},


}