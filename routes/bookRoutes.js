const express = require('express');
const { getBooks, getBookById, createBook, updateBook, deleteBook, createBookDonation, updateBookDonationStatus, getMyBookDonations } = require('../controllers/bookController');
const {uploadPhotoMiddleware} = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.get('/donation', getMyBookDonations);
router.post('/donation', uploadPhotoMiddleware, createBookDonation);
router.put('/donation/:id', updateBookDonationStatus);

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', uploadPhotoMiddleware, createBook);
router.put('/:id', uploadPhotoMiddleware, updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
