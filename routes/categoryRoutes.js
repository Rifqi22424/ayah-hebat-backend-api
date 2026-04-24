const express = require('express');
const { getCategories, createCategory, updateCategory, deleteCategory} = require('../controllers/categoryController');
const {authorizeAdmin} = require('./../middlewares/authorizationMiddleware')
const router = express.Router();

router.get('/', /* #swagger.tags = ['Categories Controller'] */ getCategories);
router.post('/', /* #swagger.tags = ['Categories Controller'] */ authorizeAdmin, createCategory);
router.put('/:id', /* #swagger.tags = ['Categories Controller'] */ authorizeAdmin, updateCategory);
router.delete('/:id', /* #swagger.tags = ['Categories Controller'] */ authorizeAdmin, deleteCategory);

module.exports = router;
