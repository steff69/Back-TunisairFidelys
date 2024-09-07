const express = require('express');

const {
addCategory,
getAllCategory,
getCategoryById,
getRandomCategory
} = require('../services/category');

const router = express.Router();


router.post( "/",addCategory) ;
router.get ("/",getAllCategory);
router.get ("/random",getRandomCategory) ;
router.get("/:id", getCategoryById);



module.exports = router;
