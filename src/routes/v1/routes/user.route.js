const express=require('express')

const userRouter=express.Router();
const UserController=require('../../../controllers/user.controller')

userRouter.post('/',UserController.AddUser)
// userRouter.post('/',()=>{
//     console.log(request.body);
//     response.json({'message' : 'User Successfully Added.'}).status(201)
// })

module.exports=userRouter;
