const BlogPost = require('../models/blog-post-model');

const createBlogPost = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    
    // Create a new blog post
    const newBlogPost = new BlogPost({
      title,
      content,
      author,
      tags
    });

    // Save the new blog post to the database
    await newBlogPost.save();

    res.status(201).json(newBlogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating blog post' });
  }
};

module.exports = {
  createBlogPost
};
