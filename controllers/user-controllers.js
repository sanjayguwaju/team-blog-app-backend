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

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user'});
  }
};