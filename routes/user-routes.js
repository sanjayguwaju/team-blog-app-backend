const express = require('express');
const userRouter = express.Router(); // Router bhaneko sub route ho haii like yo kasaiko under maa xa
const userController = require('../controllers/user-controllers');
const authMiddleware = require('../middlewares/auth-middleware');

userRouter.post('/register', authMiddleware.validateUserRegistration, userController.registerUser);
userRouter.post('/login', authMiddleware.validateLoginRequest, userController.login);
userRouter.post('/token', authMiddleware.verifyRefreshToken, userController.refreshToken);
userRouter.post('/logout', authMiddleware.verifyAccessToken, userController.logout);
userRouter.get('/getalluser', userController.getAllUsers);
userRouter.get('/getuserbyid/:id', userController.getUserById);
userRouter.delete('/deleteuser/:id', userController.deleteUser);
userRouter.put('/updateuser/:id', userController.updateUser);

module.exports = userRouter;