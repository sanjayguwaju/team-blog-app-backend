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
blogRouter.get('/search', blogPostController.searchBlogPosts);
blogRouter.post('/:id/like',blogPostController.addLike);
blogRouter.get('/:id/likes-count', blogPostController.getLikesCount);
blogRouter.post('/:id/dislike', blogPostController.removeLike);
blogRouter.post('/:id/add-dislike',blogPostController.addDisLike);
blogRouter.get('/:id/dislikes-count', blogPostController.getDislikesCount);
blogRouter.post('/:id/removedislike', blogPostController.removeDislike);


module.exports = blogRouter;
