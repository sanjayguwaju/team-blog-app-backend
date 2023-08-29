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