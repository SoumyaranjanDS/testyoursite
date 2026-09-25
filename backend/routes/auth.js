const express = require('express');
const router = express.Router();
const { signupUser, loginUser, getUserProfile } = require('../controllers/authController');

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/me', getUserProfile);

module.exports = router;
