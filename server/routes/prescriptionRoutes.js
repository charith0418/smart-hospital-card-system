const express = require('express');
const router = express.Router();
const { getPrescriptionsByPatient, getAllPrescriptions } = require('../controllers/prescriptionController');

router.get('/', getAllPrescriptions);
router.get('/:patientId', getPrescriptionsByPatient);

module.exports = router;