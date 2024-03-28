const UserRepository = require('../repositories/user.repository');
const EncryptPasswordUtil = require('../utils/password.encrypter.util');
const cloudinary=require('../config/cloudinary.config')
async function AddUser(user,profilePicture) {
    try {
        const encryptedPassword = await EncryptPasswordUtil.EncryptPassword(user.password)
        user.password=encryptedPassword;
        if(profilePicture){
            const result = await cloudinary.uploader.upload(profilePicture.path);
            user.profilePictureURL=result.secure_url
        }

        await UserRepository.AddUser(user);
    } catch (error) {
        console.error("Error Saving User In Service", error);
        throw error; // Throw the error to be caught by the caller (UserService)
    }
}

async function GetUserById(id){
    try{
        const user=await UserRepository.GetUserById(id);
        // console.log(user);
        return user;
    }catch(error){
        console.error("Internal Server Error:", error);
        throw error;
    }
}

async function GetUserByEmail(email){
    try{
        const user=await UserRepository.GetUserByEmail(email);
        // console.log(user);
        return user;
    }catch(error){
        console.error("Internal Server Error:", error);
        throw error;
    }
}
async function GetUserByUsername(username){
    try{
        const user=await UserRepository.GetUserByUsername(username);
        return user;
    }catch(error){
        console.error("Internal Server Error:", error);
        throw error;
    }
}
async function GetAllUsers(){
    try{
        const users=await UserRepository.GetAllUsers();
        return users;
    }catch(error){
        console.error("Internal Server Error:", error);
        throw error;
    }
}

async function UpdatePassword(username, oldPassword, newPassword){
    // Logged In Condition 
    const user=await UserRepository.GetUserByUsername(username);
    console.log(user);
    if(!user){
        // Returns Null User
        return user;
    }
    
    const encryptedPassword = await EncryptPasswordUtil.EncryptPassword(oldPassword)
    console.log(encryptedPassword);
    console.log(user.password);

    if(user.password==encryptedPassword){
        try{
            const encryptedNewPassword = await EncryptPasswordUtil.EncryptPassword(newPassword)
            user.password=encryptedNewPassword;

            // const user=await UserRepository.UpdatePassword(encryptedNewPassword);
            const updatedUser=await UserRepository.AddUser(user)

            return updatedUser;
        }catch(error){
            console.log('From Here');
            console.error("Internal Server Error:", error);
            throw error;
        }
    }

}

async function UpdateProfilePicture(username,profilePictureUrl){
    // Logged In Condition 
    const user=await UserRepository.GetUserByUsername(username);
    console.log(user);
    if(!user){
        // Returns Null User
        return user;
    }

    try{
        user.profilePictureURL=profilePictureUrl
        const updatedUser=await UserRepository.AddUser(user)

        return updatedUser;
    }catch(error){
        console.log('From Here');
        console.error("Internal Server Error:", error);
        throw error;
    }

}


module.exports = { AddUser, GetUserById, GetAllUsers, UpdatePassword , UpdateProfilePicture, GetUserByEmail, GetUserByUsername};
