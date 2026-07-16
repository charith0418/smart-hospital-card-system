const express = require('express');
const router = express.Router();

const { 
    getDashboard, createTestProfile, downloadQRCode, getMedicalHistory, getPrescriptions,
    registerPatient, getPatients, getPatientById, searchPatients 
} = require('../controllers/patientController');
const { protect, patientOnly } = require('../middleware/authMiddleware');

// --- PATIENT SECURED ROUTES (Your Domain) ---
router.post('/test-profile', protect, patientOnly, createTestProfile);
router.get('/dashboard', protect, patientOnly, getDashboard);
router.get('/download-qr', protect, patientOnly, downloadQRCode);
router.get('/medical-history', protect, patientOnly, getMedicalHistory);
router.get('/prescriptions', protect, patientOnly, getPrescriptions);   

// --- STAFF/ADMIN ROUTES (Partner's Domain) ---
router.post('/register', registerPatient);
router.get('/', getPatients);
router.get('/search', searchPatients);
router.get('/:id', getPatientById);

module.exports = router;