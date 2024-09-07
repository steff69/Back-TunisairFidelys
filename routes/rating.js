const express = require('express');

const {
addRating,
checkUserRating
} = require('../services/rating');

const router = express.Router();


router.post( "/",addRating) ;
router.get ("/",checkUserRating);




module.exports = router;
