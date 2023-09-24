    const mongoose = require('mongoose');

    const commentSchema = new mongoose.Schema({
        comment_message: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        blogpost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BlogPost',
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    });
    
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;