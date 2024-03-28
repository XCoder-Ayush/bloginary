const jwt = require('jsonwebtoken');
const ServerConfig=require('../config/server.config')


const AuthMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('Authorization ',token);
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, ServerConfig.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        // If everything is good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
};

module.exports = { AuthMiddleware };

