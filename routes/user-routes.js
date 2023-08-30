const express = require('express');
const userRouter = express.Router(); // Router bhaneko sub route ho haii like yo kasaiko under maa xa
const userController = require('../controllers/user-controllers');

userRouter.post('/register', userController.registerUser);
userRouter.get('/getalluser', userController.getAllUsers);
userRouter.get('/getuserbyid/:id', userController.getUserById);
userRouter.delete('/deleteuser/:id', userController.deleteUser);
userRouter.put('/updateuser/:id', userController.updateUser);


module.exports = userRouter;