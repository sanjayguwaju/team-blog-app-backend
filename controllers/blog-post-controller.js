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
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const allBlogPost = await BlogPost.find()
      .populate('author')
      .skip(skip)
      .limit(limit)
      .lean();

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
    const blogPost = await BlogPost.findById(req.params.id).populate('author').lean();
    if(!blogPost){
      return res.status(404).send({message:'blog post not found'});
    }
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).send({error:'Error fetching blog posts'});
  }
}; 

const getBlogPostsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const blogPosts = await BlogPost.find({ author: userId });
    if (!blogPosts.length) {
      return res.status(404).send({message: 'No blog posts found for this user' });
    }
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).send({error:'Error fetching blog posts'});
  }
};

const searchBlogPosts = async (req, res) => {
  try {
    const query = req.query.query;
    const blogPosts = await BlogPost.find({
      $text: {
        $search: query,
        $caseSensitive: false
      }
    }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } });

    res.status(200).json(blogPosts);
  } catch (err) {
    res.status(400).json({ error: 'Error retrieving blog posts' });
  }
};

const addLike = async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId; // Assuming the user's id is available in req.user.id

  try {
    // Find the blog post and add the user's id to the likes array
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'User has already liked this post' });
    }

    // Add the user's id to the likes array
    post.likes.push(userId);
    await post.save();

    res.status(200).json({ message: 'Like added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
}

const getLikesCount = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likesCount = post.likes.length;

    res.status(200).json({ likesCount });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

const removeLike = async (req, res)=> {
  const postId = req.params?.id;
  const userId = req.body?.userId; // Assuming the user's id is available in req.user.id

  try {
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has not liked the post
    const likeIndex = post.likes?.indexOf(userId);
    if (likeIndex === -1) {
      return res.status(400).json({ message: 'User has not liked this post' });
    }

    // Remove the user's id from the likes array
    post.likes?.splice(likeIndex, 1);
    await post.save();

    res.status(200).json({ message: 'Like removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
}

const addDisLike = async (req, res) => {
  const postId = req.params?.id;
  const userId = req.body?.userId; // Assuming the user's id is available in req.user.id

  try {
    // Find the blog post and add the user's id to the likes array
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already disliked the post
    if (post.disLikes?.includes(userId)) {
      return res.status(400).json({ message: 'User has already disliked this post' });
    }

    // Remove like if user has already liked the post
    if (post.likes?.includes(userId)) {
      const likeIndex = post.likes?.indexOf(userId);
      post.likes?.splice(likeIndex, 1);
      await post.save();
    }

    // Add the user's id to the dislikes array
    post.disLikes?.push(userId);
    await post.save();

    res.status(200).json({ message: 'Disliked post successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while trying to dislike the post. We are working to fix this. Please try again later.', error });
  }
}

const getDislikesCount = async (req, res) => {
  const postId = req.params?.id;

  try {
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const dislikesCount = post?.disLikes?.length;

    res.status(200).json({ dislikesCount });
  } catch (error) {
    res.status(500).json({ message: 'Sorry, due to unknown reasons we cannot update  the dislike count on the post', error });
  }
};

const removeDislike = async (req, res) => {
  const postId = req.params?.id;
  const userId = req.body?.userId; // Assuming the user's id is available in req.user.id

  try {
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has not disliked the post
    const dislikeIndex = post?.disLikes?.indexOf(userId);
    if (dislikeIndex === -1) {
      return res.status(400).json({ message: 'User has not disliked this post' });
    }

    // Remove the user's id from the dislikes array
    post?.disLikes?.splice(dislikeIndex, 1);
    await post.save();

    res.status(200).json({ message: 'Dislike removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Sorry, due to unknown reasons we cannot remove the dislike count on the post', error });
  }
}                                                                                                                                                                                                                                            

module.exports = {
  createBlogPost,
  updateBlogPost,
  getAllBlogPost,
  deleteBlogPost,
  getblogPostById,
  getBlogPostsByUserId,
  searchBlogPosts,
  addLike,
  getLikesCount,
  removeLike,
  addDisLike,
  getDislikesCount,
  removeDislike,
};