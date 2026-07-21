const express = require('express');
const router = express.Router();
const { addPrescription, getPrescriptionsByPatient, getPrescriptionById, getAllPrescriptions } = require('../controllers/prescriptionController');

router.post('/', addPrescription);
router.get('/', getAllPrescriptions);
router.get('/patient/:patientId', getPrescriptionsByPatient);
router.get('/:prescriptionId', getPrescriptionById);

module.exports = router;