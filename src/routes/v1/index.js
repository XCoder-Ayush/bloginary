const express=require('express')

const v1Router=express.Router();

const blogRouter=require('./routes/blog.route');
const userRouter = require('./routes/user.route');
const commentRouter = require('./routes/comment.route');
const categoryRouter = require('./routes/category.route');
const authRouter = require('./routes//auth.route');

v1Router.use('/blog',blogRouter)
v1Router.use('/user',userRouter)
v1Router.use('/comment',commentRouter)
v1Router.use('/category',categoryRouter)
v1Router.use('/auth',authRouter)

module.exports=v1Router;
