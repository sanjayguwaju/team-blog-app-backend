const express = require('express');
const userRouter = express.Router(); // Router bhaneko sub route ho haii like yo kasaiko under maa xa
const userController = require('../controllers/user-controllers');
const authMiddleware = require('../middlewares/auth-middleware');



/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create a new user
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
 *         description: Successfully created user
 *       400:
 *         description: Error creating user
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