const CategoryController = require('../../../controllers/category.controller')
const express=require('express')

const categoryRouter=express.Router();
categoryRouter.post('/',CategoryController.AddCategory)
categoryRouter.get('/:id',CategoryController.GetCategoryById)

module.exports=categoryRouter;
