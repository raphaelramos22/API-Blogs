const { Router } = require('express');
const postController = require('../controllers/postController');
const authToken = require('../services/authToken.services');

const routerPost = Router();

routerPost.use(authToken);
routerPost.post('/', postController.postCreate);
routerPost.get('/', postController.postsAll);

module.exports = routerPost;