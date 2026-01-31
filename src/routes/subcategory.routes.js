const express = require('express');
const router = express.Router();
const validateIdMiddleware = require('../middlewares/validateId.middleware.js');

const {createSubCategory,
    getAllSubCategory,
    getSubCategory,
    deleteSubCategory} = require('../controllers/subcategory.controller.js');

router.post('/category/:categoryId',(req, res, next) => {
    req.params.id = req.params.categoryId;
    next();
  }, validateIdMiddleware, createSubCategory);
router.get('/', getAllSubCategory);
router.get('/:id', validateIdMiddleware, getSubCategory);
router.delete('/:id', validateIdMiddleware, deleteSubCategory);


module.exports = router;