const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyUser, resendVerificationCode, changePassword } = require('../controllers/authController');
// const { generateToken } = require('../middlewares/jwtMiddleware');
// const passport = require('../config/passportConfig');

router.post('/register', /* #swagger.tags = ['Auth Controller'] */ registerUser);
router.post('/verify', /* #swagger.tags = ['Auth Controller'] */ verifyUser);
router.post('/resend-verification', /* #swagger.tags = ['Auth Controller'] */ resendVerificationCode); 
router.post('/login', /* #swagger.tags = ['Auth Controller'] */ loginUser);
router.put('/change-password', /* #swagger.tags = ['Auth Controller'] */ changePassword);

// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
//   async (req, res) => {
//     try {
//       const token = generateToken(req.user.id);
//       res.json({ token });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }
// );

module.exports = router;
