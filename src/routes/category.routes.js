const express = require('express');
const routes = express.Router();
const validateIdMiddleware = require('../middlewares/validateId.middleware.js');
const { createCategory, getAllCategories, getCategory, deleteCategory, getCategorySubCategoryCount } = require( '../controllers/category.controller.js');

routes.get('/sub-category-count', getCategorySubCategoryCount);

routes.post('/', createCategory);
routes.get('/', getAllCategories);

routes.get('/:id',validateIdMiddleware, getCategory);
routes.delete('/:id',validateIdMiddleware, deleteCategory);

module.exports = routes;