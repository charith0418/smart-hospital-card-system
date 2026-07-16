const Prescription = require('../models/Prescription');

const getPrescriptionsByPatient = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({
            patientId: req.params.patientId
        }).sort({ createdAt: -1 });
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find().sort({ createdAt: -1 });
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getPrescriptionsByPatient, getAllPrescriptions };