const express = require('express');
const { runLoadTest, getTestHistory, getTestById } = require('../controllers/testController');
const { protect } = require('../middleware/authMiddleware'); // Re-use the existing auth middleware

const router = express.Router();

router.post('/run', protect, runLoadTest);
router.get('/history', protect, getTestHistory);
router.get('/:id', protect, getTestById);

module.exports = router;
