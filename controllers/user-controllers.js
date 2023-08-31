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