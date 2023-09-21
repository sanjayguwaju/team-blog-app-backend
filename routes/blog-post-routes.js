const express = require('express');
const blogRouter = express.Router(); // Router bhaneko sub route ho haii like yo kasaiko under maa xa
const blogPostController = require('../controllers/blog-post-controller');
const authorization = require('../middlewares/auth-middleware');

blogRouter.post('/createblog', authorization.verifyAccessToken, blogPostController.createBlogPost);
blogRouter.put('/updatelblog/:id', authorization.verifyAccessToken, blogPostController.updateBlogPost);
blogRouter.get('/getallblog', blogPostController.getAllBlogPost);
blogRouter.delete('/deleteblog/:id', authorization.verifyAccessToken, blogPostController.deleteBlogPost);
blogRouter.get('/getblogpostbyid/:id', blogPostController.getblogPostById);

module.exports = blogRouter;