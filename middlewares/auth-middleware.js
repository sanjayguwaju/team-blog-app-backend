const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const { body, validationResult } = require('express-validator');


exports.verifyRefreshToken = async (req, res, next) => {
  // Get refresh token
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  // Verify refresh token
  let userId;
  try {
    const verified = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    userId = verified.userId;
  } catch {
    return res.sendStatus(403);
  }

  // Check if refresh token exists in database
  const user = await User.findById(userId);
  if (!user || user.refreshToken !== refreshToken) return res.sendStatus(403);

  // Set user ID on request object
  req.userId = userId;

  next();
};

exports.verifyAccessToken = (req, res, next) => {
  // Get access token
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (!accessToken) return res.sendStatus(401);

  // Verify access token
  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch {
    return res.sendStatus(403);
  }
};

exports.validateLoginRequest = [
  body('email').notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateUserRegistration= [
  body('name')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 6, max: 20 }).withMessage('Username must be between 6 and 20 characters'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  // Add more validation rules as needed for this specific endpoint
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
