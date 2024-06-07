const express = require('express');
const router = express.Router();
const { getKegiatanById, createKegiatan, evaluateKegiatan, getKegiatanByScore, getTopUsers, getAllKegiatan, updateAllUsersTotalScoreManual, getKegiatanByUserId } = require('../controllers/kegiatanController');
const { uploadMiddleware } = require('../middlewares/uploadMiddleware');
const { authorizeAdmin } = require('../middlewares/authorizationMiddleware');

router.get('/all', getAllKegiatan);
router.get('/user', getKegiatanByUserId);
router.post('/', uploadMiddleware, createKegiatan);
router.put('/evaluate', authorizeAdmin, evaluateKegiatan);
router.get('/by-score/:time', getKegiatanByScore);
router.get('/top-score/:time', getTopUsers);
router.post('/update-all-kegiatan', authorizeAdmin, updateAllUsersTotalScoreManual);
router.get('/id/:id', getKegiatanById);

module.exports = router;