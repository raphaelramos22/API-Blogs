const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const authToken = require('../services/authToken.services');

const routerCategory = Router();

routerCategory.use(authToken);
routerCategory.post('/', categoryController.categoryCreate);
routerCategory.get('/', categoryController.categoryAll);

module.exports = routerCategory;