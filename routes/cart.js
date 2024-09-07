const express = require('express');

const {
addProductToCart,
getcart,
getcartCount,
removeCartItem,
decrementPoductQty
} = require('../services/cart');

const router = express.Router();


router.post( "/",addProductToCart) ;
router.get ("/decrement/:id",decrementPoductQty);
router.delete ("/:id",removeCartItem);
router.get ("/",getcart);
router.get ("/count",getcartCount);







module.exports = router;
