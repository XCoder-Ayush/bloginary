const PasswordEncryptorUtil = require("../utils/password.encrypter.util");
const UserService = require("../services/user.service");
const AuthService = require("../services/auth.service");
const ServerConfig = require("../config/server.config");

async function LoginUser(req, res) {
  const { username, password } = req.body;

  try {
    // Encrypt the provided password
    const encryptedPassword =
      await PasswordEncryptorUtil.EncryptPassword(password);

    // Retrieve the user by username
    const user = await UserService.GetUserByUsername(username);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found." });
    }

    if (user.password !== encryptedPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Password." });
    }

    // Generate JWT token
    const token = AuthService.GenerateToken({
      id: user._id,
      username: user.username,
    });

    // Set the token as an HTTP-only and secure cookie
    res.cookie("accessToken", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: ServerConfig.NODE_ENV === "production", // Ensures the cookie is sent only over HTTPS
      sameSite: "Strict", // CSRF protection: prevents the cookie from being sent with cross-site requests
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(200).json({ success: true, message: "Login successful." });
  } catch (error) {
    console.error("Error occurred during login:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
}

async function RegisterUser(req, res) {
  const jsonData = JSON.parse(req.body.jsonData);
  // if(req.files['imageFile'])
  const imageFile =
    req.files["imageFile"] != undefined ? req.files["imageFile"][0] : null;

  console.log("JSON Data:", jsonData);
  console.log("Image File:", imageFile);

  // Except Profile Picture, All Fields Should be There:
  try {
    const user = await AuthService.RegisterUser(jsonData, imageFile);
    res
      .status(200)
      .json({ message: "User Registered Successfully", user: user });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
}

module.exports = { LoginUser, RegisterUser };
