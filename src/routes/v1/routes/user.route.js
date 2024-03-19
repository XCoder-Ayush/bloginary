const express=require('express')

const userRouter=express.Router();
const UserController=require('../../../controllers/user.controller')
const upload=require('../../../middlewares/multer.middleware')


userRouter.post('/',UserController.AddUser)
// userRouter.post('/',()=>{
//     console.log(request.body);
//     response.json({'message' : 'User Successfully Added.'}).status(201)
// })

userRouter.get('/:id',UserController.GetUserById)
userRouter.get('/',UserController.GetAllUsers)
userRouter.patch('/',UserController.UpdatePassword)
userRouter.put('/upload/:id',upload.single('file'),UserController.UpdateProfilePicture)

module.exports=userRouter;
