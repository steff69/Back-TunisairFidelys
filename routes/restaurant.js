const express = require('express');

const {
  addRestaurant,
getAllNearByRestaurants,
getRandomRestaurants,
getRestaurantById
} = require('../services/Restaurant');

const router = express.Router();


router.post( "/",addRestaurant) ;
router.get ("/:code", getRandomRestaurants);
router.get ("/all/:code",getAllNearByRestaurants);
router.get ("/byid/:id",getRestaurantById) ;

module.exports = router;
