const express = require('express');
const router = express.Router();

const { registerPatient, getPatients, getPatientById, searchPatients } = require('../controllers/patientController');

router.post('/register', registerPatient);
router.get('/', getPatients);
router.get('/search', searchPatients);
router.get('/:id', getPatientById);


module.exports = router;