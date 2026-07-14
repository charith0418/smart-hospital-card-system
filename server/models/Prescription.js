const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    medicines: [
        {
            medicineName: { type: String, required: true },
            dosage: { type: String },
            duration: { type: String }
        }
    ],
    notes: { type: String },
    prescribedBy: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);