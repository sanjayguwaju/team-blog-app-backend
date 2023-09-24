const Comment = require('../models/comment-model');

const saveComment = async (req, res) => {
    try {
    const{comment_message, author, blogpost} = req.body;

    const newComment = new Comment({
        blogpost,
        comment_message,
        author,
      });
  
      // Save the new comment to the database
      await newComment.save();
  
      res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving comment' });
    }
  };

  const updateComment = async (req, res) => {
    try{
      const commentId = req.params.id;
      const updatedComment = req.body;
  
    const comment = await Comment.findByIdAndUpdate(commentId, updatedComment, { new: true });
  
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
  
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment'});
  }
  };

  const deleteComment = async (req, res) => {
    try {
      const commentId = req.params.id;
  
      // Find and remove the blog post by ID from the database
      const deletedComment = await Comment.findByIdAndDelete(commentId);
  
      if (!deletedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      res.status(200).json({ message: 'Comment deleted', deletedComment });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting comment', error: error.message });
    }
  };

  const getAllComments = async (req, res) => {
    try {
      const blogPostId = req.params.blogpost;
      const allComments = await Comment.find(blogPostId).populate('author').lean();
      res.status(200).send(allComments);
    } catch (error) {
      res.status(500).send(error);
    }
  };
module.exports = {saveComment, updateComment, deleteComment, getAllComments};

