const express = require('express');
const router = express.Router();
const { addProfile, editProfile, getProfile, getUserNProfile, getUserPhoto } = require('../controllers/profileController');
const { uploadPhotoMiddleware } = require('../middlewares/uploadMiddleware');

router.post('/add-profile', /* #swagger.tags = ['Profile Controller'] */ uploadPhotoMiddleware, addProfile);
router.put('/edit-profile', /* #swagger.tags = ['Profile Controller'] */ uploadPhotoMiddleware, editProfile);
router.get('/get-profile', /* #swagger.tags = ['Profile Controller'] */ getProfile);
router.get('/get-user', /* #swagger.tags = ['Profile Controller'] */ getUserNProfile);
router.get('/photo', /* #swagger.tags = ['Profile Controller'] */ getUserPhoto);

module.exports = router;
