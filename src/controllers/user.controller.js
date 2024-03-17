const UserService=require('../services/user.service')

async function AddUser(request,response){
    try{
        await UserService.AddUser(request.body)
        response.status(201).json({'message' : 'User Successfully Added.'})
    }catch(error){
        console.error("Error Saving User In Controller", error);
        response.status(403).json({'message' : 'User Validation Error'})
    }
}

module.exports={ AddUser }