


const Restaurant = require('../models/restaurant');


module.exports ={

addRestaurant : async (req,res)=>{



    const { title, time, imageUrl, owner, code, logoUrl, coords} = req. body;
    
        if (!title || !time || !imageUrl || !owner || !code || ! logoUrl || 
             !coords.latitude || !coords.longitude || !coords.address || !coords.title) {
        return res.status(400).json({ status: false, message: "You have a missing field" });
    };


    try {
        const newRestaurant =new Restaurant(req.body);
        await newRestaurant.save();
         res.status(201).json({ status: true, message: "Restaurant has successfully" });

       }
   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }
   



},
getRestaurantById: async (req , res)=>{
    const id =  req.params.id;


    try {

    
         const restaurant = await Restaurant.findById(id) ;

        res.status(200).json(restaurant);}
   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }
   



},
getAllNearByRestaurants:  async (req,res)=>{
    const code = req.params.code ;
try {
let allNearByRestaurants = [] ;
if (code) {
    allNearByRestaurants = await Restaurant.aggregate(
[{$match: {code: code, isAvailable: true}},

{$project: { __v: 0}},]);};

if (allNearByRestaurants.length==0) {
    allNearByRestaurants=await Restaurant.aggregate( I
        [{$match: {code: code, isAvailable: true}},
      
       {$project: { __v: 0}}])
    }

    res.status(200).json({  Result:allNearByRestaurants.length,data:allNearByRestaurants});

}
    
    catch (error) {


       res.status(500).json({status:false, message: error.message});

    }



},
getRandomRestaurants:  async (req,res)=>{
    const code = req.params.code ;
try {
let randomRestaunt = [] ;
if (code) {
    randomRestaunt = await Restaurant.aggregate(
[{$match: {code: code, isAvailable: true}},
{$sample: {size:5}},
{$project: { __v: 0}},]);};

if (randomRestaunt.length==0) {
    randomRestaunt=await Restaurant.aggregate( I
        [{$match: {code: code, isAvailable: true}},
       {$sample: {size:5}},
       {$project: { __v: 0}}])
    }

    res.status(200).json(randomRestaunt);

}
    
    catch (error) {


       res.status(500).json({status:false, message: error.message});

    }



},

}