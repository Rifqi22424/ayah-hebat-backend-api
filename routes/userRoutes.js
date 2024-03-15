const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyUser, resendVerificationCode, changePassword } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/verify', verifyUser);
router.post('/resend-verification', resendVerificationCode); 
router.post('/login', loginUser);
router.put('/change-password', changePassword);

module.exports = router;
