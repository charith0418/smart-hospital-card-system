const Treatment = require('../models/Treatment');
const PatientProfile = require('../models/PatientProfile');

const addTreatment = async (req, res) => {
    const { patientId, diagnosis, notes, consultant } = req.body;

    try {
        const patient = await PatientProfile.findOne({ patientId });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const treatment = await Treatment.create({ patientId, diagnosis, notes, consultant });

        await PatientProfile.findOneAndUpdate(
            { patientId },
            { lastVisit: new Date() },
            { new: true }
        );

        res.status(201).json({ message: 'Treatment saved successfully', treatment });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getTreatments = async (req, res) => {
    try {
        const treatments = await Treatment.find().sort({ createdAt: -1 });
        res.status(200).json(treatments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getTreatmentsByPatient = async (req, res) => {
    try {
        const treatments = await Treatment.find({ patientId: req.params.patientId })
            .sort({ createdAt: -1 });
        res.status(200).json(treatments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { addTreatment, getTreatments, getTreatmentsByPatient };