const express = require('express');
const { getBooks, getBookById, createBook, updateBook, deleteBook, createBookRequest, updateBookRequestStatus, getMyBookRequests } = require('../controllers/bookController');
const {uploadPhotoMiddleware} = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.get('/request', getMyBookRequests);
router.post('/request', uploadPhotoMiddleware, createBookRequest);
router.put('/request/:id', updateBookRequestStatus);

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', uploadPhotoMiddleware, createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
