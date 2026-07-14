const generatePatientId = require('../utils/generatePatientId');
const QRCode = require('qrcode');
const patientService = require('../services/patientService');

const registerPatient = async (req, res) => {
    const { fullName, nic, dob, gender, phone, address, bloodGroup } = req.body;
    try {
        const patientId = await generatePatientId();
        const qrCodeData = await QRCode.toDataURL(patientId);
        const patient = await patientService.registerPatient({
            patientId, fullName, nic, dob, gender,
            phone, address, bloodGroup, qrCodeData
        });
        res.status(201).json({ message: 'Patient registered successfully', patient });
    } catch (error) {
        res.status(error.message.includes('NIC') ? 400 : 500)
           .json({ message: error.message });
    }
};

const getPatients = async (req, res) => {
    try {
        const patients = await patientService.getAllPatients();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getPatientById = async (req, res) => {
    try {
        const patient = await patientService.getPatientById(req.params.id);
        res.status(200).json(patient);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const searchPatients = async (req, res) => {
    const { q } = req.query;
    try {
        const patients = await patientService.searchPatients(q);
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { registerPatient, getPatients, getPatientById, searchPatients };