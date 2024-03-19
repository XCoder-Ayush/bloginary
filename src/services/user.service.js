const UserRepository = require('../repositories/user.repository');
const EncryptPasswordUtil = require('../utils/password.encrypter.util');

async function AddUser(user) {
    try {
        const encryptedPassword = await EncryptPasswordUtil.EncryptPassword(user.password)
        user.password=encryptedPassword;
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

async function GetAllUsers(){
    try{
        const users=await UserRepository.GetAllUsers();
        return users;
    }catch(error){
        console.error("Internal Server Error:", error);
        throw error;
    }
}

async function UpdatePassword(id, oldPassword, newPassword){
    // Logged In Condition 
    const user=await UserRepository.GetUserById(id);
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

async function UpdateProfilePicture(id,profilePictureUrl){
    // Logged In Condition 
    const user=await UserRepository.GetUserById(id);
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


module.exports = { AddUser, GetUserById, GetAllUsers, UpdatePassword , UpdateProfilePicture};
