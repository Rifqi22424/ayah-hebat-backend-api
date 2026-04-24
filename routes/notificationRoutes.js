const express = require('express');
const { sendToUser, sendToAll, getUserNotifications, getUserNotificationById } = require('../controllers/notificationController');
const { uploadPhotoMiddleware } = require('../middlewares/uploadMiddleware');
const router = express.Router();
const { authorizeAdmin } = require('../middlewares/authorizationMiddleware');

router.post('/send-to-user/:id', /* #swagger.tags = ['Notification Controller'] */ authorizeAdmin, uploadPhotoMiddleware, sendToUser);
router.post('/send-to-all', /* #swagger.tags = ['Notification Controller'] */ authorizeAdmin, uploadPhotoMiddleware, sendToAll);
router.get('/user-notifications', /* #swagger.tags = ['Notification Controller'] */ getUserNotifications);
router.get('/id/:id', /* #swagger.tags = ['Notification Controller'] */ getUserNotificationById);

module.exports = router;
