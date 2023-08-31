const User = require('../models/user-model');

exports.registerUser = async (req, res) => {
    try {

        const user = await new User(req.body);

        await user.save();
        res.status(201).send(user);
    } catch (error) {
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
    try{
      const userId = req.params.id;
      const updatedData = req.body;

    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user'});
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
