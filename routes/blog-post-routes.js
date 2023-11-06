const express = require('express');
const blogRouter = express.Router(); // Router bhaneko sub route ho haii like yo kasaiko under maa xa
const blogPostController = require('../controllers/blog-post-controller');
const authorization = require('../middlewares/auth-middleware');

/**
 * @swagger
 * /blogs/createblog:
 *   post:
 *     summary: Create a new blog posts
 *     parameters:
 *       - in: header
 *         name: authorization
 *         description: Authorization token
 *         schema:
 *           type: string
 *       - in: body
 *         name: content
 *         description: Content of the blog post
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully created blog post
 *       400:
 *         description: Error creating blog post
 */


blogRouter.post('/createblog', blogPostController.createBlogPost);
/**
 * @swagger
 * /blogs/updateblog:
 *   put:
 *     summary: Update a new blog post
 *     parameters:
 *       - in: header
 *         title: authorization
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         content: content
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully updated blog post
 *       400:
 *         description: Error updating blog post
 */
blogRouter.put('/updateblog/:id',blogPostController.updateBlogPost);
/**
 * @swagger
 * /blogs/createblog:
 *   get:
 *     summary: Get all blog post
 *     parameters:
 *       - in: header
 *         title: authorization
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         content: content
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully got all blog post
 *       400:
 *         description: Error creating blog post
 */
blogRouter.get('/getallblog', blogPostController.getAllBlogPost);
/**
 * @swagger
 * /blogs/getallblog:
 *   get:
 *     summary: Get all blogs
 *     responses:
 *       200:
 *         description: Successfully retrieved all blogs
 *         schema:
 *           type: array
 *       400:
 *         description: Error retrieving blogs
 */

blogRouter.delete('/deleteblog/:id',blogPostController.deleteBlogPost);
/**
 * @swagger
 * /blogs/getblogpostbyid/{id}:
 *   get:
 *     summary: Create a new blog post
 *     parameters:
 *       - in: header
 *         title: authorization
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         content: content
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully created blog post
 *       400:
 *         description: Error creating blog post
 */
blogRouter.get('/getblogpostbyid/:id', blogPostController.getblogPostById);

module.exports = blogRouter;