const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

exports.login = async (req, res) => {
  // Find the user
  const user = await User.findOne({ email: req.body.email }); 
  console.log("user --->", user);

  if (!user) {
    // User not found, handle the scenario here (e.g., return an error response).
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  
  if (!validPassword) return res.status(400).send('Invalid username or password');

  // Create tokens
  const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1hr' });
  const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET);

  // Update refresh token
  user.refreshToken = refreshToken;
  await user.save();

  // Send tokens
  res.cookie('refreshToken', refreshToken, { httpOnly: true });
  res.json({ 
    accessToken,
    userId: user?._id,
    email: user?.email,
    username: user?.name
  });
};

exports.refreshToken = async (req, res) => {
  // Get user ID from request object
  const userId = req.userId;

  // Find the user
  const user = await User.findById(userId);

  if (!user) {
    // User not found, handle the scenario here (e.g., return an error response).
    return res.status(404).json({ error: 'User not found' });
  }

  // Create new tokens
  const newAccessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1hr' });
  const newRefreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET);

  // Update refresh token in database
  user.refreshToken = newRefreshToken;
  await user.save();

  //Access Token in Cookies Send tokens
  res.cookie('refreshToken', newRefreshToken, { httpOnly: true });
  res.json({ accessToken: newAccessToken });
};

exports.logout = async (req, res) => {
  // Get user ID from request object
  const userId = req.userId;

  // Find the user
  const user = await User.findById(userId);

  if (!user) {
    // User not found, handle the scenario here (e.g., return an error response).
    return res.status(404).json({ error: 'User not found' });
  }

  // Remove refresh token
  user.refreshToken = null;
  await user.save();

  // Clear cookie
  res.clearCookie('refreshToken');

  res.sendStatus(204); // Success with no content to send
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
