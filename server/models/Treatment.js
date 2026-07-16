const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'PatientProfile', required: true },
    patientId: { type: String, required: true }, // Added from partner
    prescriptionId: { type: String, required: true }, 
    diagnosis: { type: String }, // Added from partner
    consultant: { type: String }, // Added from partner
    instructions: { type: String }, // Kept your instructions
    notes: { type: String }, // Added from partner
    dateIssued: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Treatment', treatmentSchema);