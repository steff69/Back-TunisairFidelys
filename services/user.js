



const User = require('../models/user');


module.exports ={

getUser : async (req,res)=>{
    try {

    const user = await User.findById(req.user.id)

       const {password , __v , createdAt , ...userData } = user.doc;

         res.status(201).json({ status: true, data: userData });

       }
   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }
   



},
getallUser : async (req,res)=>{
    try {

    const user = await User.find({})

       

         res.status(200).json({ status: true, data: user });

       }
   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }},

verifyAccount: async (req , res)=>{

    const otp =  req.params.otp;
   


    try {

    
         const category = await Category.findById(id) 

        res.status(200).json(category);
      
      }

   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }
   



},


}