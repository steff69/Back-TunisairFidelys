const express = require('express');

const {addFood,
    getFoodByCategoryAndCode,getFoodById,
    getFoodByRestaurant,getRandomFood,getRandomFoodsByCategoryAndCode,searchFood
 
} = require('../services/Food');

const router = express.Router();

router.get ("/restaurant-foods/:id",getFoodByRestaurant) ;

router.post( "/",addFood) ;
router.get ("/all",getRandomFoodsByCategoryAndCode);
router.get ("/:id", getFoodById);
router.get ("/search/:search", searchFood);
router.get ("/random/:code", getRandomFood);
router.get ("/:category/:code", getFoodByCategoryAndCode);








module.exports = router;
