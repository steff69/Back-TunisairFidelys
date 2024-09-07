



const Address = require('../models/Adress');


module.exports ={

addAddress : async (req,res)=>{
    try {

    const newAddress = new Address(
        { 
             userId : req.user.id,        
            addressLine1: req.body.addressLine1,
            postalCode: req.body.postalCode,
                default: req.body.default,
deliveryInstructions: req.body.deliveryInstructions,
latitude: req.body.latitude,
longitude: req.body.longitude
        }
    )
        if ( req.body.default === true)
     {
        await Address.updateMany({ userId : req.user.id}, {default : false}       
        )

        
     }
     await newAddress.save()


         res.status(201).json({ status: true, message: 'succssfullu' });

       }
   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }
   



},


getaddress:  async (req,res)=>{
  
try {


  const  Addresses = await Address.find({userId : req.user.id})



    res.status(200).json({  Result:allCategorys.length,data:Addresses});

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