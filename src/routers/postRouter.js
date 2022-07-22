const { Router } = require('express');
const postController = require('../controllers/postController');
const authToken = require('../services/authToken.services');

const routerPost = Router();

routerPost.use(authToken);
routerPost.post('/', postController.postCreate);
routerPost.get('/', postController.postsAll);
routerPost.get('/:id', postController.postId);
routerPost.put('/:id', postController.postUpdated);
routerPost.delete('/:id', postController.postIdDelete);

module.exports = routerPost;