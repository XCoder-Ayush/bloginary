const CommentController = require('../../../controllers/comment.controller')
const express=require('express')

const commentRouter=express.Router();

commentRouter.post('/',CommentController.AddComment)

module.exports=commentRouter;
