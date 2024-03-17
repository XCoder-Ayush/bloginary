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

module.exports = { AddUser };
