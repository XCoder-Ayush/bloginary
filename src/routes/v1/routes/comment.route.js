const CommentController = require('../../../controllers/comment.controller')
const express=require('express')

const commentRouter=express.Router();
const { AuthMiddleware }=require('../../../middlewares/auth.middleware')

commentRouter.post('/',AuthMiddleware,CommentController.AddComment)

module.exports=commentRouter;
