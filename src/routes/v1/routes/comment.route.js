const CommentController = require('../../../controllers/comment.controller')
const express=require('express')

const commentRouter=express.Router();
const { AuthMiddleware }=require('../../../middlewares/auth.middleware')

commentRouter.post('/',AuthMiddleware,CommentController.AddComment)
commentRouter.get('/:id',CommentController.GetCommentById)
commentRouter.patch('/like',AuthMiddleware,CommentController.UpdateCommentLikeCount)
commentRouter.patch('/reply',AuthMiddleware,CommentController.UpdateCommentThread)

module.exports=commentRouter;
