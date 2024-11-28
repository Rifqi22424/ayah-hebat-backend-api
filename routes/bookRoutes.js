const express = require('express');
const { getBooks, getBookById, createBook, updateBook, deleteBook, createBookRequest, updateBookRequestStatus } = require('../controllers/bookController');
const {uploadPhotoMiddleware} = require('../middlewares/uploadMiddleware');
const {createCommentBook, editComment, deleteComment} = require("./../controllers/commentBookController")
const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', uploadPhotoMiddleware, createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

router.post('/request', uploadPhotoMiddleware, createBookRequest);
router.put('/request/:id', updateBookRequestStatus);

module.exports = router;
