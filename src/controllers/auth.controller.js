const PasswordEncryptorUtil=require('../utils/password.encrypter.util')
const UserService=require('../services/user.service')
const AuthService=require('../services/auth.service')
async function LoginUser(req, res){
    // First Time Login
    const username = req.body.username;
    const password = req.body.password;

    const encryptedPassword = await PasswordEncryptorUtil.EncryptPassword(password);

    try {
        // Get User Of id
        const user = await UserService.GetUserByUsername(username);
        
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


async function RegisterUser(req , res){
    
    const jsonData = JSON.parse(req.body.jsonData);
    // if(req.files['imageFile'])
    const imageFile = (req.files['imageFile']!=undefined?req.files['imageFile'][0]:null);

    console.log('JSON Data:', jsonData);
    console.log('Image File:', imageFile);

    // Except Profile Picture, All Fields Should be There:
    try{
        const user=await AuthService.RegisterUser(jsonData, imageFile)
        res.status(200).json({ "message": 'User Registered Successfully', "user": user });
    }catch(err){
        res.status(422).json({'error' : err.message})
    }
}

module.exports={ LoginUser, RegisterUser }