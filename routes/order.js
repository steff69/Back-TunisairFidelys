const express = require('express');

const {
addOrder,
getUserOrders
} = require('../services/order');

const router = express.Router();


router.post( "/",addOrder) ;
router.get ("/",getUserOrders);




module.exports = router;
