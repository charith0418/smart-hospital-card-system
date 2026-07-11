const mongoose = require('mongoose');

const patientProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    patientId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    nic: { type: String, required: true, unique: true },
    bloodGroup: { type: String },
    dob: { type: Date },
    phone: { type: String },
    address: { type: String },
    gender: { type: String },
    lastVisit: { type: Date },
    qrCodeData: { type: String },
    emergencyContact: {
        name: { type: String },
        relation: { type: String },
        phone: { type: String }
    },
    medicalHistory: [{
        condition: { type: String },
        year: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model('PatientProfile', patientProfileSchema);