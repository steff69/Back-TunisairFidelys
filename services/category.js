



const Category = require('../models/category');


module.exports ={

addCategory : async (req,res)=>{



    


    try {
        const newCategory =new Category(req.body);
        await newCategory.save();
         res.status(201).json({ status: true, message: "Category Created successfully" });

       }
   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }
   



},
getCategoryById: async (req , res)=>{

    const id =  req.params.id;
    console.log(id)


    try {

    
         const category = await Category.findById(id) 

        res.status(200).json(category);
      
      }

   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }
   



},
getAllCategory:  async (req,res)=>{
  
try {


  const  allCategorys = await Category.find({}, {__v:0})



    res.status(200).json({  Result:allCategorys.length,data:allCategorys});

}
    
    catch (error) {


       res.status(500).json({status:false, message: error.message});

    }



},
getRandomCategory:  async (req,res)=>{


    
try {
  
  let randomCategory= await Category.aggregate([{$match: {value:{$ne:"more"}}},
         {$sample: {size:4}}]);

  





    res.status(200).json(randomCategory);

}
    
    catch (error) {


       res.status(500).json({status:false, message: error.message});

    }



},

}