const BlogPost = require('../models/blog-post-model');

const createBlogPost = async (req, res) => {
  try {
    const { title, content, image, author, tags, category } = req.body;
    
    // Create a new blog post
    const newBlogPost = new BlogPost({
      title,
      content,
      image,
      author,
      tags,
      category,
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

const getAllBlogPost = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const skip = (page - 1) * limit;
  try {
    const allBlogPost = await BlogPost.find().populate('author').sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    res.status(200).send(allBlogPost);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteBlogPost = async (req, res) => {
  try {
    const blogId = req.params.id;

    // Find and remove the blog post by ID from the database
    const deletedBlog = await BlogPost.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'blog post deleted', deletedBlog });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog post', error: error.message });
  }
};

const getblogPostById = async (req, res) => { 
  try{
    const blogPost = await BlogPost.findById(req.params.id);
    if(!blogPost){
      return res.status(404).send({message:'blog post not found'});
    }
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).send({error:'Error fetching blog posts'});
  }
}; 


module.exports = {
  createBlogPost,
  updateBlogPost,
  getAllBlogPost,
  deleteBlogPost,
  getblogPostById
};