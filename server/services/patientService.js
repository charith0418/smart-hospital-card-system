const PatientProfile = require('../models/PatientProfile');

const getPatientDashboardData = async (userId, userEmail) => {
   
    const profile = await PatientProfile.findOne({ user: userId });

    if (!profile) {
        throw new Error('Patient profile not found'); 
    }

    const latestPrescriptionData = profile.prescriptions.length > 0 
        ? profile.prescriptions[profile.prescriptions.length - 1].medications 
        : [];

    return {
        healthCard: {
            fullName: profile.fullName,
            patientId: profile.patientId,
            bloodGroup: profile.bloodGroup,
            dob: profile.dob,
            gender: profile.gender,
            phone: profile.phone,
            qrCodeData: profile.qrCodeData
        },
        personalInformation: {
            patientId: profile.patientId,
            phone: profile.phone,
            email: userEmail, 
            address: profile.address,
            gender: profile.gender,
            dob: profile.dob
        },
        medicalHistory: profile.medicalHistory,
        latestPrescriptions: latestPrescriptionData,
        emergencyContact: profile.emergencyContact
    };
};

const getDetailedMedicalHistory = async (userId) => {
    const profile = await PatientProfile.findOne({ user: userId });

    if (!profile) {
        throw new Error('Patient profile not found');
    }

    let currentAge = 'N/A';
    if (profile.dob) {
        const diffMs = Date.now() - profile.dob.getTime();
        const ageDate = new Date(diffMs); 
        currentAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    return {
        headerInfo: {
            fullName: profile.fullName,
            age: `${currentAge} Years`,
            bloodGroup: profile.bloodGroup,
            dob: profile.dob
        },
        history: profile.medicalHistory || {
            diagnoses: [],
            surgeries: [],
            allergies: [],
            vaccinations: []
        }
    };
};


module.exports = {
    getPatientDashboardData,
    getDetailedMedicalHistory
};