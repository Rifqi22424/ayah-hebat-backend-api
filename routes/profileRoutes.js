const express = require('express');
const router = express.Router();
const { addProfile, editProfile, getProfile, getUserNProfile, getUserPhoto } = require('../controllers/profileController');
const { uploadPhotoMiddleware } = require('../middlewares/uploadMiddleware');

router.post('/add-profile', uploadPhotoMiddleware, addProfile);
router.put('/edit-profile', uploadPhotoMiddleware, editProfile);
router.get('/get-profile', getProfile);
router.get('/get-user', getUserNProfile);
router.get('/photo', getUserPhoto);

module.exports = router;