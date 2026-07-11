const PatientProfile = require('../models/PatientProfile');
const generatePatientId = require('../utils/generatePatientId');
const QRCode = require('qrcode');

const registerPatient = async (req, res) => {
    const { fullName, nic, dob, gender, phone, address, bloodGroup } = req.body;

    try {
        const nicExists = await PatientProfile.findOne({ nic });
        if (nicExists) {
            return res.status(400).json({ message: 'Patient with this NIC already exists' });
        }

        const patientId = await generatePatientId();

        const qrCodeData = await QRCode.toDataURL(patientId);

        const patient = await PatientProfile.create({
    patientId,
    fullName,
    nic,
    dob,
    gender,
    phone,
    address,
    bloodGroup,
    qrCodeData
});

        res.status(201).json({
            message: 'Patient registered successfully',
            patient
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getPatients = async (req, res) => {
    try {
        const patients = await PatientProfile.find().sort({ createdAt: -1 });
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getPatientById = async (req, res) => {
    try {
        const patient = await PatientProfile.findOne({ patientId: req.params.id });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
//add new part
const searchPatients = async (req, res) => {
    const { q } = req.query;
    try {
        const patients = await PatientProfile.find({
            $or: [
                { fullName: { $regex: q, $options: 'i' } },
                { patientId: { $regex: q, $options: 'i' } }
            ]
        }).limit(10);
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = { registerPatient, getPatients, getPatientById,searchPatients };