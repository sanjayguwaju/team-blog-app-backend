const express = require('express');
const blogRouter = express.Router(); // Router bhaneko sub route ho haii like yo kasaiko under maa xa
const blogPostController = require('../controllers/blog-post-controller');
const authorization = require('../middlewares/auth-middleware');

blogRouter.post('/createblog', blogPostController.createBlogPost);
blogRouter.put('/updateblog/:id',blogPostController.updateBlogPost);
blogRouter.get('/getallblog', blogPostController.getAllBlogPost);
blogRouter.delete('/deleteblog/:id',blogPostController.deleteBlogPost);
blogRouter.get('/getblogpostbyid/:id', blogPostController.getblogPostById);
blogRouter.get('/get-blog-post-by-user-id/:id', blogPostController.getBlogPostsByUserId);

/**
 * @swagger
 * /blogs/search/{query}:
 *   get:
 *     summary: Search blog posts
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved blog posts
 *       400:
 *         description: Error retrieving blog posts
 */
blogRouter.get('/search', blogPostController.searchBlogPosts);

module.exports = blogRouter;