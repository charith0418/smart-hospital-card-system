const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/patientController');
const { protect, patientOnly } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, patientOnly, getDashboardData);

module.exports = router;