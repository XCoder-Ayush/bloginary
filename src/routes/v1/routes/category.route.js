const CategoryController = require('../../../controllers/category.controller')
const express=require('express')

const categoryRouter=express.Router();
categoryRouter.post('/',CategoryController.AddCategory)


module.exports=categoryRouter;
