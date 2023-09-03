const BlogPost = require('../models/blog-post-model');

const createBlogPost = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;

    // // Validate input data
    // if (!title || !content || !author || !tags) {
    //   return res.status(400).json({ message: 'Missing required fields' });
    // }

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



const updateBlogPost = async (req, res) => {
  try{
    const blogId = req.params.id;
    const updatedData = req.body;

  const blogPost = await BlogPost.findByIdAndUpdate(blogId, updatedData, { new: true });

  if (!blogPost) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.status(200).json(blogPost);
} catch (error) {
  res.status(500).json({ message: 'Error updating post'});
}
};

module.exports = {
  createBlogPost,
  updateBlogPost
};