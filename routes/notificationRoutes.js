const express = require('express');
const { sendToUser, sendToAll, getUserNotifications, getUserNotificationById } = require('../controllers/notificationController');
const { uploadPhotoMiddleware } = require('../middlewares/uploadMiddleware');
const router = express.Router();
const { authorizeAdmin } = require('../middlewares/authorizationMiddleware');

router.post(
  '/send-to-user/:id',
  authorizeAdmin,
  uploadPhotoMiddleware,
  /* #swagger.tags = ['Notification Controller']
  #swagger.consumes = ['multipart/form-data']
  #swagger.requestBody = {
      required: true,
      content: {
          "multipart/form-data": {
              schema: {
                  type: "object",
                  properties: {
                      photo: {
                          type: "string",
                          format: "binary",
                          description: "Upload gambar notifikasi (opsional)"
                      },
                      title: { type: "string" },
                      body: { type: "string" },
                      data: {
                          type: "string",
                          description: "JSON string. Contoh: {\"key\":\"value\"}"
                      }
                  },
                  required: ["title", "body"]
              }
          }
      }
  }
  */ sendToUser,
);
router.post(
  '/send-to-all',
  authorizeAdmin,
  uploadPhotoMiddleware,
  /* #swagger.tags = ['Notification Controller']
  #swagger.consumes = ['multipart/form-data']
  #swagger.requestBody = {
      required: true,
      content: {
          "multipart/form-data": {
              schema: {
                  type: "object",
                  properties: {
                      photo: {
                          type: "string",
                          format: "binary",
                          description: "Upload gambar notifikasi (opsional)"
                      },
                      title: { type: "string" },
                      body: { type: "string" },
                      data: {
                          type: "string",
                          description: "JSON string. Contoh: {\"key\":\"value\"}"
                      }
                  },
                  required: ["title", "body"]
              }
          }
      }
  }
  */ sendToAll,
);
router.get('/user-notifications', /* #swagger.tags = ['Notification Controller'] */ getUserNotifications);
router.get('/id/:id', /* #swagger.tags = ['Notification Controller'] */ getUserNotificationById);

module.exports = router;
