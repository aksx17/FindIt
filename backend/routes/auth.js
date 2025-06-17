
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

// Auth routes
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/google', authController.googleAuth);
router.get('/profile', verifyToken, authController.getProfile);

module.exports = router;
