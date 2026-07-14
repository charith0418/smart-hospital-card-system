const PatientProfile = require('../models/PatientProfile');

const getAllPatients = async () => {
    return await PatientProfile.find().sort({ createdAt: -1 });
};

const getPatientById = async (patientId) => {
    const patient = await PatientProfile.findOne({ patientId });
    if (!patient) throw new Error('Patient not found');
    return patient;
};

const searchPatients = async (query) => {
    return await PatientProfile.find({
        $or: [
            { fullName: { $regex: query, $options: 'i' } },
            { patientId: { $regex: query, $options: 'i' } }
        ]
    }).limit(10);
};

const registerPatient = async (patientData) => {
    const nicExists = await PatientProfile.findOne({ nic: patientData.nic });
    if (nicExists) throw new Error('Patient with this NIC already exists');
    return await PatientProfile.create(patientData);
};

module.exports = { getAllPatients, getPatientById, searchPatients, registerPatient };