const express = require('express');
const router = express.Router();
const { saveDeviceToken, deleteUser, createDeleteAccountVerificationCode, verifyDeleteAccount, resendDeleteAccountVerificationCode } = require('../controllers/userController');

router.put('/save-token', saveDeviceToken);

router.post('/delete-account/verification-code', createDeleteAccountVerificationCode);
router.post('/delete-account/verify', verifyDeleteAccount);
router.post('/delete-account/resend-verification-code', resendDeleteAccountVerificationCode);

router.delete('', deleteUser);

module.exports = router;