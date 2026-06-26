const PatientProfile = require('../models/PatientProfile');
const Prescription = require('../models/Prescription');

const getDashboardData = async (req, res) => {
    try {
        
        const profile = await PatientProfile.findOne({ user: req.user._id });

        if (!profile) {
            return res.status(404).json({ message: 'Patient profile not found. Please contact staff.' });
        }

        
        const latestPrescription = await Prescription.findOne({ patient: profile._id })
            .sort({ dateIssued: -1 });

        res.status(200).json({
            personalInfo: {
                fullName: profile.fullName,
                patientId: profile.patientId,
                bloodGroup: profile.bloodGroup,
                dob: profile.dob,
                phone: profile.phone,
                email: req.user.email, 
                address: profile.address,
                gender: profile.gender,
            },
            qrCodeData: profile.qrCodeData,
            medicalHistory: profile.medicalHistory,
            emergencyContact: profile.emergencyContact,
            latestPrescription: latestPrescription ? latestPrescription.medications : []
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching dashboard data' });
    }
};

module.exports = { getDashboardData };