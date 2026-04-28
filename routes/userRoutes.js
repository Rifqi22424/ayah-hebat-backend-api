const express = require('express');
const router = express.Router();
const { authorizeAdmin } = require('./../middlewares/authorizationMiddleware')
const { saveDeviceToken, deleteUser, createDeleteAccountVerificationCode, verifyDeleteAccount, resendDeleteAccountVerificationCode, updateUserApproval, getAllUsers } = require('../controllers/userController');

router.put('/save-token', /* #swagger.tags = ['User Controller'] */ saveDeviceToken);

router.post('/delete-account/verification-code', /* #swagger.tags = ['User Controller'] */ createDeleteAccountVerificationCode);
router.post('/delete-account/verify', /* #swagger.tags = ['User Controller'] */ verifyDeleteAccount);
router.post('/delete-account/resend-verification-code', /* #swagger.tags = ['User Controller'] */ resendDeleteAccountVerificationCode);

router.delete('', /* #swagger.tags = ['User Controller'] */ deleteUser);
router.patch('/approval', authorizeAdmin, updateUserApproval);
router.get('/', authorizeAdmin, getAllUsers)

module.exports = router;
