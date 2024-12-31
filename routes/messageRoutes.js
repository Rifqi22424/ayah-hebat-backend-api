const express = require('express');
const router = express.Router();
const {getMessages, sendMessages, getMessagesWithUserId} = require('../controllers/messageController');
const {uploadPhotoMiddleware} = require('./../middlewares/uploadMiddleware');

router.get('/', getMessages);
router.get('/:userId', getMessagesWithUserId);
router.post('/:userId', uploadPhotoMiddleware, sendMessages);

module.exports = router;