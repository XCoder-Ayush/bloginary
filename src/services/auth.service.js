const jwt=require('jsonwebtoken')

const ServerConfig=require('../config/server.config')
function GenerateToken(userData) {
    const token = jwt.sign(userData, ServerConfig.JWT_SECRET, { expiresIn: '10s' });
    return token;
}

module.exports={ GenerateToken }