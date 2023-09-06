const express = require('express');
const userRouter = express.Router(); // Router bhaneko sub route ho haii like yo kasaiko under maa xa
const userController = require('../controllers/user-controllers');
const authMiddleware = require('../middlewares/auth-middleware');

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', authMiddleware.validateLoginRequest, userController.login);
userRouter.post('/token', authMiddleware.verifyRefreshToken, authController.refreshToken);
userRouter.post('/logout', authMiddleware.verifyAccessToken, authController.logout);
userRouter.get('/getalluser', userController.getAllUsers);
userRouter.put('/updateuser/:id', userController.updateUser);
userRouter.delete('/deleteuser/:id', userController.deleteUser);
userRouter.get('/getuserbyid/:id', userController.getUserById);

module.exports = userRouter;