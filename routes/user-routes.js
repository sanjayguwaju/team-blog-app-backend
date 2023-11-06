const express = require('express');
const userRouter = express.Router(); // Router bhaneko sub route ho haii like yo kasaiko under maa xa
const userController = require('../controllers/user-controllers');
const authMiddleware = require('../middlewares/auth-middleware');



/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *       required: true
 *     responses:
 *       201:
 *         description: Successfully registered the user
 *       400:
 *         description: Error during registration
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: "Apurva Manandhar"
 *         email:
 *           type: string
 *           format: email
 *           example: "apurvamanandhar@gmail.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "test123@#"
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         code:
 *           type: integer
 *           format: int32
 *           description: Error code
 */



userRouter.post('/register', authMiddleware.validateUserRegistration, userController.registerUser);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a new user
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: content
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully Logged in
 *       400:
 *         description: Error Logging in
 */
userRouter.post('/login', authMiddleware.validateLoginRequest, userController.login);
/**
 * @swagger
 * /users/token:
 *   post:
 *     summary: Create new token
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: content
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully created new token 
 *       400:
 *         description: Error creating new token
 */
userRouter.post('/token', authMiddleware.verifyRefreshToken, userController.refreshToken);
/**
 * @swagger
 * /users/logout:
 *   Delete:
 *     summary: User logout
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: content
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       400:
 *         description: Error logging out
 */
userRouter.post('/logout', authMiddleware.verifyAccessToken, userController.logout);
/**
 * @swagger
 * /users/getalluser:
 *   get:
 *     summary: get all user 
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: content
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully get all user
 *       400:
 *         description: Error 
 */
userRouter.get('/getalluser', userController.getAllUsers);
/**
 * @swagger
 * /users/getuserbyid/{id}:
 *   get:
 *     summary: get all user 
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: content
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully get all user
 *       400:
 *         description: Error 
 */
userRouter.get('/getuserbyid/:id', userController.getUserById);
/**
 * @swagger
 * /users/deleteuser/{id}:
 *   delete:
 *     summary: delete user
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: content
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully delete user by id
 *       400:
 *         description: Error 
 */
userRouter.delete('/deleteuser/:id', userController.deleteUser);
/**
 * @swagger
 * /users/updateuser/{id}:
 *   put:
 *     summary: delete user by id
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: content
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully update user
 *       400:
 *         description: Error 
 */
userRouter.put('/updateuser/:id', userController.updateUser);



module.exports = userRouter;