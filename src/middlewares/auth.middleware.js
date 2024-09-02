const jwt = require("jsonwebtoken");
const ServerConfig = require("../config/server.config");

const AuthMiddleware = (req, res, next) => {
  // Check for session ID (connect.sid) first
  if (req.session && req.session.passport && req.session.passport.user) {
    // User is authenticated via Google OAuth (session-based)
    req.userId = req.session.passport.user;
    return next();
  }

  // Check for the accessToken cookie if no session ID is found
  const token = req.cookies.accessToken;
  console.log(accessToken);

  if (token) {
    // Verify the JWT token
    jwt.verify(token, ServerConfig.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: "Failed to authenticate token.",
        });
      }

      // Save user ID to request for use in other routes
      req.userId = decoded.id;
      return next();
    });
  } else {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }
};

module.exports = { AuthMiddleware };
