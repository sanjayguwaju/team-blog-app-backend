const User = require('../models/user-model');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user with the hashed password
    const user = new User({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
    });

    // Save the user to the database
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    // Check if the password is being updated
    if (updatedData.password) {
      // Hash the new password
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

exports.deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Find and remove the user by ID from the database
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted', deletedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

exports.getUserById = async (req, res) => { 
    try{
      const users = await User.findById(req.params.id);
      if(!users){
        return res.status(404).send({message:'User not found'});
      }
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send({error:'Error fetching user'});
    }
}; 
