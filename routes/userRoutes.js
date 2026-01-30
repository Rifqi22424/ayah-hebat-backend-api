const express = require('express');
const router = express.Router();
const { authorizeAdmin } = require('./../middlewares/authorizationMiddleware')
const { saveDeviceToken, deleteUser, createDeleteAccountVerificationCode, verifyDeleteAccount, resendDeleteAccountVerificationCode, updateUserApproval, getAllUsers } = require('../controllers/userController');

router.put('/save-token', saveDeviceToken);

router.post('/delete-account/verification-code', createDeleteAccountVerificationCode);
router.post('/delete-account/verify', verifyDeleteAccount);
router.post('/delete-account/resend-verification-code', resendDeleteAccountVerificationCode);

router.patch('/approval', authorizeAdmin, updateUserApproval);
router.get('/', authorizeAdmin, getAllUsers)
router.delete('', deleteUser);

module.exports = router;