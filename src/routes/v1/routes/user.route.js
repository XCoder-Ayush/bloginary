const express=require('express')

const userRouter=express.Router();
const UserController=require('../../../controllers/user.controller')
const upload=require('../../../middlewares/multer.middleware')
const { AuthMiddleware }=require('../../../middlewares/auth.middleware')

userRouter.post('/',UserController.AddUser)
// userRouter.post('/',()=>{
//     console.log(request.body);
//     response.json({'message' : 'User Successfully Added.'}).status(201)
// })

// userRouter.get('/:id',UserController.GetUserById)
userRouter.get('/:username',UserController.GetUserByUsername)
userRouter.get('/', AuthMiddleware, UserController.GetAllUsers)
userRouter.patch('/',UserController.UpdatePassword)
userRouter.put('/upload/:id',upload.single('file'),UserController.UpdateProfilePicture)

module.exports=userRouter;
