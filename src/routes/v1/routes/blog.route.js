const express=require('express')

const blogRouter=express.Router();

const BlogController= require('../../../controllers/blog.controller')

blogRouter.get('/',BlogController.GetAllBlogs)
blogRouter.post('/',BlogController.AddBlog)
blogRouter.get('/:id',BlogController.GetBlogById)
blogRouter.delete('/:id',BlogController.DeleteBlogById)
blogRouter.put('/:id',BlogController.UpdateBlogById)

module.exports=blogRouter;
