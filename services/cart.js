



const Cart = require('../models/cart');


module.exports ={

addProductToCart : async (req,res)=>{

  const  userId = req.body.id ; 
  
    const { productId , totalPrice, quantity , additives } = req.body
    try {

       const eProduct = await Cart.findOne({userId , productId})
       const count = await Cart.countDocuments({userId})
         
        if ( eProduct){
            eProduct.totalPrice +=totalPrice+quantity
            eProduct.quantity +=quantity

            await eProduct.save();
        
                 
          return  res.status(201).json({ status: true, count });
        }else {

         const newCart = new Cart(
                { 
                    usertId:userId,        
                    productId:productId,
         totalPrice,
         quantity,
         additives,
                }
            )

            await newCart.save()
            const countt = await Cart.countDocuments({userId})
            return  res.status(201).json({ status: true, countt });

        }
       

       }
   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }
   



},


removeCartItem:  async (req,res)=>{


    const cartItemId = req.params.id
 


  
try {


  await Cart.findByIdAndDelete({_id : cartItemId})
  const count = await Cart.countDocuments({userId})




    res.status(201).json({ status: true, count });

}
    
    catch (error) {


       res.status(500).json({status:false, message: error.message});

    }



},
getcart:  async (req,res)=>{

    const  userId = req.body.id ; 
    try {

    const cart = await Cart.find({userId})
   
    
    .populate({
        path : 'productId',
        select :'imageUrl title restaurant rating ratingCount' , 
        populate :{
            path :'restaurant' ,
            select :'time coords' ,


        }
    })
  
  

  





    res.status(200).json(cart);

}
    
    catch (error) {


       res.status(500).json({status:false, message: error.message});

    }



},
getcartCount:  async (req,res)=>{

    const  userId = req.body.id ; 

    try {

    
        const count = await Cart.countDocuments({userId})




        return  res.status(201).json({ status: true, count });
      

  
  

  






}
    
    catch (error) {


       res.status(500).json({status:false, message: error.message});

    }



},

decrementPoductQty :  async (req,res)=>{
    const userId = req.body.id;
    const id = req.params.id;



    try {


         const carItem = await  Cart.findById(id);


         if(carItem)
         {
      const productPrice = carItem.totalPrice / carItem.quantity;
      if (carItem.quantity > 1)
      {
        carItem.quantity -= 1
        carItem.totatPrice -= productPrice;
        await carItem.save()
          res.status(201).json({ status: true, message : 'p , q syccessfully' });
        }
    else {
     await Cart.findOneAndDelete({_id : id});

     res.status(201).json({ status: true, message : 'product removed seccssfully' });

    }
}
    
    else {
        res.status(400).json({ status: true, message : 'cart  item not found' });


    }

     
    
        const count = await Cart.countDocuments({userId})




        return  res.status(201).json({ status: true, count });
      

  
  

  






}



    catch (error) {


        res.status(500).json({status:false, message: error.message});
 
     }
 

 }
 


};