const crypto = require('crypto');
const ServerConfig=require('../config/server.config')
const secretKey=ServerConfig.SECRET_KEY

const EncryptPassword = async(password) => {
    const hmac = await crypto.createHmac('sha256', secretKey);
    await hmac.update(password);
    const hashedPassword= await hmac.digest('hex');
    return hashedPassword;
};

// const bcrypt = require('bcrypt');

// const saltRounds = 10; // Number of salt rounds for bcrypt

// const EncryptPassword = async (password) => {
//     try {
//         // Generate a salt
//         const salt = await bcrypt.genSalt(saltRounds);
//         // Hash the password with the salt
//         const hashedPassword = await bcrypt.hash(password, salt);


//         return hashedPassword;
//     } catch (error) {
//         console.error("Error Encrypting Password:", error);
//         throw error;
//     }
// };

module.exports = {
    EncryptPassword
};
