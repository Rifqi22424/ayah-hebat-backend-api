const express = require('express');
const { getCategories, createCategory, updateCategory, deleteCategory} = require('../controllers/categoryController');
const {authorizeAdmin} = require('./../middlewares/authorizationMiddleware')
const router = express.Router();

router.get('/', authorizeAdmin, getCategories);
router.post('/', authorizeAdmin, createCategory);
router.put('/:id', authorizeAdmin, updateCategory);
router.delete('/:id', authorizeAdmin, deleteCategory);

module.exports = router;
