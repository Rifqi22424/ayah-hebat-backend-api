const express = require('express');
const { getBooks, getBookById, createBook, updateBook, deleteBook, createBookDonation, updateBookDonationStatus, getMyBookDonations, getMyBookDonationById } = require('../controllers/bookController');
const {uploadPhotoMiddleware} = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.get('/donation/:id', /* #swagger.tags = ['Books Controller'] */ getMyBookDonationById);
router.get('/donation', /* #swagger.tags = ['Books Controller'] */ getMyBookDonations);
router.post('/donation', /* #swagger.tags = ['Books Controller'] */ uploadPhotoMiddleware, createBookDonation);
router.put('/donation/:id', /* #swagger.tags = ['Books Controller'] */ updateBookDonationStatus);

router.get('/', /* #swagger.tags = ['Books Controller'] */ getBooks);
router.get('/:id', /* #swagger.tags = ['Books Controller'] */ getBookById);
router.post('/', /* #swagger.tags = ['Books Controller'] */ uploadPhotoMiddleware, createBook);
router.put('/:id', /* #swagger.tags = ['Books Controller'] */ uploadPhotoMiddleware, updateBook);
router.delete('/:id', /* #swagger.tags = ['Books Controller'] */ deleteBook);

module.exports = router;
