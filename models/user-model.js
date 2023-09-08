const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: { 
        type: String 
    }
}); // Rules for the data we want to store

const User = mongoose.model('User', userSchema);  //users = collection banxa

module.exports = User;

