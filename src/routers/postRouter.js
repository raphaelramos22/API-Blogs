const { Router } = require('express');
const postController = require('../controllers/postController');
const authToken = require('../services/authToken.services');

const routePost = Router();

routePost.use(authToken);
routePost.post('/', postController.postCreate);

module.exports = routePost;