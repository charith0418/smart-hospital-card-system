const patientService = require('../services/patientService');
const PatientProfile = require('../models/PatientProfile'); 

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

module.exports = { getDashboard , createTestProfile , downloadQRCode, getMedicalHistory};