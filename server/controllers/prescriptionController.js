const Prescription = require('../models/Prescription');
const PatientProfile = require('../models/PatientProfile');
const generatePrescriptionId = require('../utils/generatePrescriptionId');

const addPrescription = async (req, res) => {
    const { patientId, prescribedBy, location, diagnosis, medicines, notes } = req.body;

    try {
        const patient = await PatientProfile.findOne({ patientId });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const prescriptionId = await generatePrescriptionId();

        const prescription = await Prescription.create({
            prescriptionId,
            patientId,
            prescribedBy,
            location,
            diagnosis,
            medicines,
            notes
        });

        res.status(201).json({ message: 'Prescription created successfully', prescription });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

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

const getPrescriptionById = async (req, res) => {
    try {
        const prescription = await Prescription.findOne({
            prescriptionId: req.params.prescriptionId
        });
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        res.status(200).json(prescription);
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

module.exports = { addPrescription, getPrescriptionsByPatient, getPrescriptionById, getAllPrescriptions };