const express = require('express');
const router = express.Router();
const { addProfile, editProfile, getProfile, getUserNProfile, getUserPhoto } = require('../controllers/profileController');
const { uploadPhotoMiddleware } = require('../middlewares/uploadMiddleware');

router.post(
  '/add-profile',
  uploadPhotoMiddleware,
  /* #swagger.tags = ['Profile Controller']
  #swagger.consumes = ['multipart/form-data']
  #swagger.requestBody = {
      required: false,
      content: {
          "multipart/form-data": {
              schema: {
                  type: "object",
                  properties: {
                      photo: {
                          type: "string",
                          format: "binary",
                          description: "Upload foto profil"
                      },
                      nama: { type: "string" },
                      namaIstri: { type: "string" },
                      namaAnak: { type: "string" },
                      namaKuttab: { type: "string" },
                      tahunMasukKuttab: { type: "integer" },
                      bio: { type: "string" }
                  }
              }
          }
      }
  }
  */ addProfile,
);
router.put(
  '/edit-profile',
  uploadPhotoMiddleware,
  /* #swagger.tags = ['Profile Controller']
  #swagger.consumes = ['multipart/form-data']
  #swagger.requestBody = {
      required: false,
      content: {
          "multipart/form-data": {
              schema: {
                  type: "object",
                  properties: {
                      photo: {
                          type: "string",
                          format: "binary",
                          description: "Upload foto profil"
                      },
                      nama: { type: "string" },
                      namaIstri: { type: "string" },
                      namaAnak: { type: "string" },
                      namaKuttab: { type: "string" },
                      tahunMasukKuttab: { type: "integer" },
                      bio: { type: "string" }
                  }
              }
          }
      }
  }
  */ editProfile,
);
router.get('/get-profile', /* #swagger.tags = ['Profile Controller'] */ getProfile);
router.get('/get-user', /* #swagger.tags = ['Profile Controller'] */ getUserNProfile);
router.get('/photo', /* #swagger.tags = ['Profile Controller'] */ getUserPhoto);

module.exports = router;
