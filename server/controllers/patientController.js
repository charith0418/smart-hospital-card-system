const patientService = require('../services/patientService');
const PatientProfile = require('../models/PatientProfile');
const Prescription = require('../models/Prescription'); 
const Treatment = require('../models/Treatment');
const QRCode = require('qrcode'); 
const generatePatientId = require('../utils/generatePatientId'); // Partner's utility

// --- YOUR PATIENT CONTROLLERS ---

const createTestProfile = async (req, res) => {
    try {
        const existingProfile = await PatientProfile.findOne({ user: req.user._id });
        if (existingProfile) return res.status(400).json({ message: 'Profile already exists' });

        const { prescriptions, treatments, ...profileData } = req.body;
        const newProfile = await PatientProfile.create({ user: req.user._id, ...profileData });

        if (prescriptions && prescriptions.length > 0) {
            const rxData = prescriptions.map(rx => ({ ...rx, patient: newProfile._id, patientId: newProfile.patientId }));
            await Prescription.insertMany(rxData);
        }
        if (treatments && treatments.length > 0) {
            const treatmentData = treatments.map(t => ({ ...t, patient: newProfile._id, patientId: newProfile.patientId }));
            await Treatment.insertMany(treatmentData);
        }
        res.status(201).json({ message: 'Test profile created successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating profile', error: error.message });
    }
};

const getDashboard = async (req, res) => {
    try {
        const dashboardData = await patientService.getPatientDashboardData(req.user._id, req.user.email);
        res.status(200).json(dashboardData);
    } catch (error) {
        if (error.message === 'Patient profile not found') return res.status(404).json({ message: 'Patient profile not found.' });
        res.status(500).json({ message: 'Server error while fetching dashboard data' });
    }
};

const downloadQRCode = async (req, res) => {
    try {
        const profile = await PatientProfile.findOne({ user: req.user._id });
        if (!profile || !profile.qrCodeData) return res.status(404).json({ message: 'QR Code not found' });
        
        const qrBuffer = await QRCode.toBuffer(profile.qrCodeData, { errorCorrectionLevel: 'H', type: 'png', width: 300, margin: 2 });
        res.set({ 'Content-Type': 'image/png', 'Content-Disposition': `attachment; filename="${profile.patientId}-HealthCard-QR.png"` });
        res.send(qrBuffer);
    } catch (error) {
        res.status(500).json({ message: 'Error generating QR code' });
    }
};

const getMedicalHistory = async (req, res) => {
    try {
        res.status(200).json(await patientService.getDetailedMedicalHistory(req.user._id));
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getPrescriptions = async (req, res) => {
    try {
        res.status(200).json(await patientService.getPrescriptionDetails(req.user._id));
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// --- YOUR PARTNER'S STAFF CONTROLLERS ---

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
        res.status(error.message.includes('NIC') ? 400 : 500).json({ message: error.message });
    }
};

const getPatients = async (req, res) => {
    try {
        res.status(200).json(await patientService.getAllPatients());
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getPatientById = async (req, res) => {
    try {
        res.status(200).json(await patientService.getPatientById(req.params.id));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const searchPatients = async (req, res) => {
    try {
        res.status(200).json(await patientService.searchPatients(req.query.q));
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { 
    getDashboard, createTestProfile, downloadQRCode, getMedicalHistory, getPrescriptions,
    registerPatient, getPatients, getPatientById, searchPatients 
};