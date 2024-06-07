const express = require('express');
const router = express.Router();
const { saveDeviceToken } = require('../controllers/userController');

router.put('/save-token', saveDeviceToken);

module.exports = router;
