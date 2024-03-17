const UserRepository = require('../repositories/user.repository');

async function AddUser(user) {
    try {
        await UserRepository.AddUser(user);
    } catch (error) {
        console.error("Error Saving User In Service", error);
        throw error; // Throw the error to be caught by the caller (UserService)
    }
}

module.exports = { AddUser };
