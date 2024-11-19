const express = require('express');
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const {uploadPhotoMiddleware} = require('../middlewares/uploadMiddleware');
const {createCommentBook, editComment, deleteComment} = require("./../controllers/commentBookController")
const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', uploadPhotoMiddleware, createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

// comment book
router.post("/:id/comments", createCommentBook);
router.put("/:id/comments/:commentId", editComment);
router.delete("/:bookId/comments/:commentId", deleteComment);

module.exports = router;
