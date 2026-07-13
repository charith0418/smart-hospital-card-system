const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'PatientProfile', required: true },
    doctorName: { type: String },
    medications: [{
        name: { type: String }, 
        dosageInstructions: { type: String }
    }],
    dateIssued: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);