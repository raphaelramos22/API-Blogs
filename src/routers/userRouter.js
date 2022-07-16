const { Router } = require('express');
const userController = require('../controllers/userController');

const routerUser = Router();

routerUser.post('/', userController.userCreate);
routerUser.get('/', userController.userAll);

module.exports = routerUser;