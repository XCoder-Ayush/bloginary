const UserService = require("../services/user.service");
const cloudinary = require('../config/cloudinary.config');


async function AddUser(request, response) {
  try {
    await UserService.AddUser(request.body);
    response.status(201).json({ message: "User Successfully Added." });
  } catch (error) {
    console.error("Error Saving User In Controller", error);
    response.status(403).json({ message: "User Validation Error" });
  }
}

async function GetUserById(request, response) {
  try {
    // Your code to fetch user by ID
    const id = request.params.id;
    const user = await UserService.GetUserById(id);

    // If user not found
    if (!user) {
      console.error("User Not Found With Id:", request.params.id);
      response.status(404).json({ message: "User Not Found" });
      return;
    }

    // If user found, return user data
    response.status(200).json(user);
  } catch (error) {
    console.error("Internal Server Error:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
}
async function GetUserByUsername(request, response) {
  try {
    // Your code to fetch user by ID
    const username = request.params.username;
    const user = await UserService.GetUserByUsername(username);

    // If user not found
    if (!user) {
      console.error("User Not Found With Username:", request.params.username);
      response.status(404).json({ message: "User Not Found" });
      return;
    }

    // If user found, return user data
    response.status(200).json(user);
  } catch (error) {
    console.error("Internal Server Error:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
}
async function GetAllUsers(request, response) {
    try {
      // Your code to fetch user by ID
      const users = await UserService.GetAllUsers();
  
      // If user not found
      if (!users) {
        console.error("No Users in DB : ");
        response.status(404).json({ message: "Users Not Found" });
        return;
      }
  
      // If user found, return user data
      response.status(200).json(users);
    } catch (error) {
      console.error("Internal Server Error:", error);
      response.status(500).json({ message: "Internal Server Error" });
    }
  }

async function UpdatePassword(request, response) {
  try {
    // Your code to fetch user by ID
    const id = request.body.id;
    const oldPassword = request.body.oldPassword;
    const newPassword = request.body.newPassword;

    const user = await UserService.UpdatePassword(id, oldPassword, newPassword);

    // If user not found
    if (!user) {
      console.error("User Not Found With Id:", request.params.id);
      response.status(404).json({ message: "User Not Found" });
      return;
    }

    // If user found, return user data
    response.status(200).json(user);
  } catch (error) {
    console.error("Internal Server Error:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
}

const UpdateProfilePicture = async (req, res) => {
  try {
    // Check if file is uploaded
    const id=req.params.id;
    console.log(req.file);    

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    console.log(req.file);    
    
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Delete the file from local server (optional)
    // fs.unlinkSync(req.file.path);
    console.log(result)
    
    const user=await UserService.UpdateProfilePicture(id,result.secure_url)
    
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error Updating Profile Picture:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { AddUser, GetUserById, UpdatePassword, UpdateProfilePicture , GetAllUsers, GetUserByUsername};
