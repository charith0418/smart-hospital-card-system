const express = require('express');
const router = express.Router();
const { getDashboard ,createTestProfile } = require('../controllers/patientController');
const { protect, patientOnly } = require('../middleware/authMiddleware');

router.post('/test-profile', protect, patientOnly, createTestProfile);
router.get('/dashboard', protect, patientOnly, getDashboard);

module.exports = router;