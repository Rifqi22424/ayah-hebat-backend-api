const express = require('express');
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const {uploadPhotoMiddleware} = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', uploadPhotoMiddleware, createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
