const express=require('express')

const authRouter=express.Router();
const upload = require('../../../middlewares/multer.middleware')
const AuthController= require('../../../controllers/auth.controller')

authRouter.post('/',AuthController.LoginUser)

// authRouter.post('/register', upload.fields([{ name: 'image-file', maxCount: 1 }, { name: 'json-data', maxCount: 1 }]), AuthController.RegisterUser);
authRouter.post('/register', upload.fields([{ name: 'imageFile', maxCount: 1 }, { name: 'jsonData', maxCount: 1 }]), AuthController.RegisterUser);
module.exports=authRouter;
