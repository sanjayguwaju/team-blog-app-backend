const BlogPost = require('../models/blog-post-model');

const createBlogPost = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;

    // Validate input data
    if (!title || !content || !author || !tags) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new blog post
    const newBlogPost = new BlogPost({
      title,
      content,
      author,
      tags
    });

    // Save the new blog post to the database
    await blogPost.save();

    res.status(201).json(blogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating blog post' });
  }
};

module.exports = {
  createBlogPost
};
