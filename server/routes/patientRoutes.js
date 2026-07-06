const express = require('express');
const router = express.Router();
const { getDashboard } = require('../controllers/patientController');
const { protect, patientOnly } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, patientOnly, getDashboard);

module.exports = router;