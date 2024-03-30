const express=require('express')

const blogRouter=express.Router();

const BlogController= require('../../../controllers/blog.controller')
const { AuthMiddleware }=require('../../../middlewares/auth.middleware')

blogRouter.get('/',BlogController.GetAllBlogs)
blogRouter.post('/',AuthMiddleware,BlogController.AddBlog)
blogRouter.get('/:id',BlogController.GetBlogById)
blogRouter.delete('/:id',AuthMiddleware,BlogController.DeleteBlogById)
blogRouter.put('/:id',AuthMiddleware,BlogController.UpdateBlogById)
blogRouter.patch('/like',AuthMiddleware,BlogController.UpdateBlogLikeCount)

module.exports=blogRouter;
