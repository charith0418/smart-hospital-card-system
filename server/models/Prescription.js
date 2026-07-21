// const mongoose = require('mongoose');

// const prescriptionSchema = new mongoose.Schema({
//     patientId: { type: String, required: true },
//     medicines: [
//         {
//             medicineName: { type: String, required: true },
//             dosage: { type: String },
//             duration: { type: String }
//         }
//     ],
//     notes: { type: String },
//     prescribedBy: { type: String }
// }, { timestamps: true });

// module.exports = mongoose.model('Prescription', prescriptionSchema);

const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    prescriptionId: { type: String, required: true, unique: true },
    patientId: { type: String, required: true },
    prescribedBy: { type: String },
    location: { type: String },
    diagnosis: { type: String },
    medicines: [
        {
            medicineName: { type: String, required: true },
            dosage: { type: String },
            frequency: { type: String },
            duration: { type: String }
        }
    ],
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);