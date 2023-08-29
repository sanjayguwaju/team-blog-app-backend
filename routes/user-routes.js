const express = require('express');
const userRouter = express.Router(); // Router bhaneko sub route ho haii like yo kasaiko under maa xa
const userController = require('../controllers/user-controllers');

userRouter.post('/register', userController.registerUser);
userRouter.get('/getalluser', userController.getAllUsers);

module.exports = userRouter;