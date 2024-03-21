const PasswordEncryptorUtil=require('../utils/password.encrypter.util')
const UserService=require('../services/user.service')
const AuthService=require('../services/auth.service')
async function LoginUser(req, res){
    // First Time Login
    const id = req.body.id;

    const password = req.body.password;

    const encryptedPassword = await PasswordEncryptorUtil.EncryptPassword(password);

    try {
        // Get User Of id
        const user = await UserService.GetUserById(id);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User Not Found.' });
        }

        if (user.password !== encryptedPassword) {
            return res.status(401).json({ success: false, message: 'Incorrect Password.' });
        }

        const token = AuthService.GenerateToken(req.body);
        
        res.status(200).json({ success: true, token: token });
    } catch (error) {
        console.error('Error occurred during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

module.exports={ LoginUser }