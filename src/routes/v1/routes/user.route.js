const express = require("express");

const userRouter = express.Router();
const UserController = require("../../../controllers/user.controller");
const upload = require("../../../middlewares/multer.middleware");
const { AuthMiddleware } = require("../../../middlewares/auth.middleware");
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Add a new user
 *     description: Add a new user to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               userData:
 *                 type: string
 *                 description: User data in JSON format
 *     responses:
 *       201:
 *         description: User successfully added
 *       403:
 *         description: User validation error
 */
userRouter.post("/", upload.single("file"), UserController.AddUser);
// userRouter.post('/',()=>{
//     console.log(request.body);
//     response.json({'message' : 'User Successfully Added.'}).status(201)
// })

// userRouter.get('/:id',UserController.GetUserById)
/**
 * @swagger
 * /user/{username}:
 *   get:
 *     summary: Get a user by username
 *     description: Retrieve a user by their username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with user data
 *       404:
 *         description: User not found
 */
userRouter.get("/:username", UserController.GetUserByUsername);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with list of users
 *       404:
 *         description: Users not found
 */
userRouter.get("/", AuthMiddleware, UserController.GetAllUsers);

/**
 * @swagger
 * /user:
 *   patch:
 *     summary: Update user password
 *     description: Update the password for an existing user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the user
 *               oldPassword:
 *                 type: string
 *                 description: Current password of the user
 *               newPassword:
 *                 type: string
 *                 description: New password to be set
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       404:
 *         description: User not found
 */
userRouter.patch("/", UserController.UpdatePassword);

/**
 * @swagger
 * /user/upload/{id}:
 *   put:
 *     summary: Update user profile picture
 *     description: Upload a new profile picture for a user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Internal server error
 */
userRouter.put(
  "/upload/:id",
  upload.single("file"),
  UserController.UpdateProfilePicture
);

module.exports = userRouter;
