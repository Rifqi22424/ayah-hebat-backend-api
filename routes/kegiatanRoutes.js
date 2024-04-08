const express = require('express');
const router = express.Router();
const { getKegiatan, createKegiatan, evaluateKegiatan, getKegiatanByScore, getTopUsers, getAllKegiatan, updateAllUsersTotalScoreManual } = require('../controllers/kegiatanController');
const { uploadMiddleware } = require('../middlewares/uploadMiddleware');

router.get('/', getKegiatan);
router.get('/all', getAllKegiatan);
router.post('/', uploadMiddleware, createKegiatan);
router.put('/evaluate', evaluateKegiatan);
router.get('/by-score/:time', getKegiatanByScore);
router.get('/top-score/:time', getTopUsers);
router.post('/update-all-kegiatan', updateAllUsersTotalScoreManual);

module.exports = router;