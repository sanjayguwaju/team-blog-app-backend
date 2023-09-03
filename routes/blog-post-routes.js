const express = require('express');
const blogRouter = express.Router(); // Router bhaneko sub route ho haii like yo kasaiko under maa xa
const blogPostController = require('../controllers/blog-post-controller');

blogRouter.post('/createblog', blogPostController.createBlogPost);
blogRouter.put('/updatelblog/:id', blogPostController.updateBlogPost);
module.exports = blogRouter;