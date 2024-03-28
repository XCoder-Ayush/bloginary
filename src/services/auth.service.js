const jwt=require('jsonwebtoken')

const ServerConfig=require('../config/server.config')
const UserService=require('../services/user.service')

function GenerateToken(userData) {
    const token = jwt.sign(userData, ServerConfig.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

async function RegisterUser(userData, profilePicture){
    console.log(profilePicture);
    // 1. None of the user fields should be empty.
    // Todo: Validation With Joi Library

    if(!userData.username || !userData.email || !userData.password || !userData.firstName || !userData.lastName){
        throw new Error("All mandatory fields required.")
    }
    // 2. Email and username should be unique.
    let checkUser=await UserService.GetUserByEmail(userData.email)
    if(checkUser){
        throw new Error("Email should be unique.")
    }
    
    checkUser=await UserService.GetUserByUsername(userData.username)
    if(checkUser){
        throw new Error("Username should be unique.")
    }

    // All necessary conditions matched.
    let user = {
        "username":userData.username,
        "email":userData.email,
        "firstName":userData.firstName,
        "lastName":userData.lastName,
        "password":userData.password,
        "profilePictureURL":""
    }
    // Then, upload profile picture in cloudinary and get image url
    // Create user schema and pass on to userservice to save the user

    user = await UserService.AddUser(user,profilePicture)
    return user;
    
}
module.exports={ GenerateToken , RegisterUser}