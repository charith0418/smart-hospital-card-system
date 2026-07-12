const patientService = require('../services/patientService');
const PatientProfile = require('../models/PatientProfile')
const QRCode = require('qrcode'); 

const createTestProfile = async (req, res) => {
    try {
        const existingProfile = await PatientProfile.findOne({ user: req.user._id });
        if (existingProfile) {
            return res.status(400).json({ message: 'Profile already exists for this user' });
        }

        const newProfile = await PatientProfile.create({
            user: req.user._id, 
            ...req.body        
        });

        res.status(201).json({ message: 'Test profile created successfully!', profile: newProfile });
    } catch (error) {
        res.status(500).json({ message: 'Error creating profile', error: error.message });
    }
};

const getDashboard = async (req, res) => {
    try {
        const userId = req.user._id;
        const userEmail = req.user.email; 
        const dashboardData = await patientService.getPatientDashboardData(userId, userEmail);

        res.status(200).json(dashboardData);

    } catch (error) {
        console.error("Dashboard Fetch Error:", error.message);
        
        if (error.message === 'Patient profile not found') {
            return res.status(404).json({ message: 'Patient profile not found. Please contact hospital staff.' });
        }
        
        res.status(500).json({ message: 'Server error while fetching dashboard data' });
    }
};


const downloadQRCode = async (req, res) => {
    try {
        const profile = await PatientProfile.findOne({ user: req.user._id });

        if (!profile || !profile.qrCodeData) {
            return res.status(404).json({ message: 'QR Code data not found for this patient.' });
        }
       
        const qrBuffer = await QRCode.toBuffer(profile.qrCodeData, {
            errorCorrectionLevel: 'H', 
            type: 'png',
            width: 300,               
            margin: 2
        });
        res.set({
            'Content-Type': 'image/png',
            'Content-Disposition': `attachment; filename="${profile.patientId}-HealthCard-QR.png"`,
        });
        res.send(qrBuffer);
    } catch (error) {
        console.error("QR Code Generation Error:", error.message);
        res.status(500).json({ message: 'Error generating QR code file' });
    }
};

const getMedicalHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const historyData = await patientService.getDetailedMedicalHistory(userId);
        
        res.status(200).json(historyData);
    } catch (error) {
        console.error("Medical History Fetch Error:", error.message);
        if (error.message === 'Patient profile not found') {
            return res.status(404).json({ message: 'Patient profile not found.' });
        }
        res.status(500).json({ message: 'Server error while fetching medical history' });
    }
};

module.exports = { getDashboard , createTestProfile , downloadQRCode, getMedicalHistory};