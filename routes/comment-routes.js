const express = require('express');
const commentRouter = express.Router(); // Router bhaneko sub route ho haii like yo kasaiko under maa xa
const commentController = require('../controllers/comment-controller');
const authorization = require('../middlewares/auth-middleware');

commentRouter.post('/savecomment',commentController.saveComment);
commentRouter.put('/updatecomment/:id', commentController.updateComment);
commentRouter.delete('/deletecomment/:id', commentController.deleteComment);
commentRouter.get('/getallcommentsbyblogpost/:id', commentController.getAllComments);

module.exports = commentRouter;