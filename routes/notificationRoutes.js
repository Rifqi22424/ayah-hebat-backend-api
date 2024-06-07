const express = require('express');
const { sendToUser, sendToAll, getUserNotifications, getUserNotificationById } = require('../controllers/notificationController');
const { uploadPhotoMiddleware } = require('../middlewares/uploadMiddleware');
const router = express.Router();
const { authorizeAdmin } = require('../middlewares/authorizationMiddleware');

router.post('/send-to-user/:id', authorizeAdmin, uploadPhotoMiddleware, sendToUser);
router.post('/send-to-all', authorizeAdmin, uploadPhotoMiddleware, sendToAll);
router.get('/user-notifications', getUserNotifications);
router.get('/id/:id', getUserNotificationById);

module.exports = router;
