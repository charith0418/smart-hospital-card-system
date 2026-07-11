const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    diagnosis: { type: String, required: true },
    notes: { type: String },
    consultant: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Treatment', treatmentSchema);