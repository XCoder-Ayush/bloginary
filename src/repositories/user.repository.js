const User = require("../models/user.model");

async function AddUser(user) {
    try {
        const newUser = new User(user);
        const savedUser = await newUser.save();
        console.log("User Saved Successfully:", savedUser);
        return savedUser; // Return the saved user for potential further use
    } catch (error) {
        console.error("Error Saving User In Repo", error);
        throw error; // Throw the error to be caught by the caller (UserService)
    }
}

async function GetUserById(id) {
    try {
        // const user = await User.findById(id);
        // console.log('Id Here ',id);
        const user = await User.findById(id);
        console.log(user);
        if (!user) {
            console.error("User Not Found In DB With Id : ", id);
        }
        return user;

    } catch (error) {
        console.error("Internal Server Error:", error);
        throw error;
    }
}
async function GetUserByEmail(email) {
    try {
        const user = await User.findOne({email});
        console.log('In Repo',user);
        if (!user) {
            console.error("User Not Found In DB With Id : ", email);
        }
        return user;

    } catch (error) {
        console.error("Internal Server Error:", error);
        throw error;
    }
}

async function GetUserByUsername(username) {
    try {
        const user = await User.findOne({username});
        console.log('In Repo',user);
        if (!user) {
            console.error("User Not Found In DB With Username : ", username);
        }
        return user;
    } catch (error) {
        console.error("Internal Server Error:", error);
        throw error;
    }
}
async function UpdatePassword(username, newPassword) {
    try {
        const user = await User.findOne({username});

        if (!user) {
            console.error("User Not Found In DB With Username : ", username);
            return user;
        }
        // Update the password
        user.password = newPassword;
        // Save the updated user
        await user.save();

        return user;
    } catch (error) {
        console.error("Error Updating Password : ", error);
        throw error;
    }
}

async function UpdateProfilePicture(username, newProfilePictureURL) {
    try {
        // Find the user by username
        const user = await User.findOne({username});

        if (!user) {
            console.error("User Not Found In DB With Username : ", username);
            return user;
        }

        // Update the profile picture URL
        user.profilePictureURL = newProfilePictureURL;

        // Save the updated user
        await user.save();

        return user;
    } catch (error) {
        console.error("Error Updating Profile Picture:", error);
        throw error;
    }
}

async function GetAllUsers() {
    try {
        const users = await User.find({});
        
        if (!users || users.length === 0) {
            console.error("No users found in the database");
        }

        return users;
    } catch (error) {
        console.error("Internal Server Error:", error);
        throw error;
    }
}



module.exports = { AddUser, GetUserById , UpdatePassword, UpdateProfilePicture, GetAllUsers, GetUserByEmail, GetUserByUsername};
