const express=require('express')

const authRouter=express.Router();

const AuthController= require('../../../controllers/auth.controller')

authRouter.post('/',AuthController.LoginUser)
module.exports=authRouter;
