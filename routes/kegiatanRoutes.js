const express = require('express');
const router = express.Router();
const { getKegiatanById, createKegiatan, evaluateKegiatan, getKegiatanByScore, getTopUsers, getAllKegiatan, updateAllUsersTotalScoreManual, getKegiatanByUserId } = require('../controllers/kegiatanController');
const { uploadMiddleware } = require('../middlewares/uploadMiddleware');
const { authorizeAdmin } = require('../middlewares/authorizationMiddleware');

router.get('/all', /* #swagger.tags = ['Kegiatan Controller'] */ getAllKegiatan);
router.get('/user', /* #swagger.tags = ['Kegiatan Controller'] */ getKegiatanByUserId);
router.post('/', /* #swagger.tags = ['Kegiatan Controller'] */ uploadMiddleware, createKegiatan);
router.put('/evaluate', /* #swagger.tags = ['Kegiatan Controller'] */ authorizeAdmin, evaluateKegiatan);
router.get('/by-score/:time', /* #swagger.tags = ['Kegiatan Controller'] */ getKegiatanByScore);
router.get('/top-score/:time', /* #swagger.tags = ['Kegiatan Controller'] */ getTopUsers);
router.post('/update-all-kegiatan', /* #swagger.tags = ['Kegiatan Controller'] */ authorizeAdmin, updateAllUsersTotalScoreManual);
router.get('/id/:id', /* #swagger.tags = ['Kegiatan Controller'] */ getKegiatanById);

module.exports = router;
