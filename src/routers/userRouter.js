const { Router } = require('express');
const userController = require('../controllers/userController');
const authToken = require('../services/authToken.services');

const routerUser = Router();

routerUser.post('/', userController.userCreate);
routerUser.use(authToken);
routerUser.get('/', userController.userAll);
routerUser.get('/:id', userController.userId);
routerUser.delete('/me', userController.deleteUser);

module.exports = routerUser;