const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'PatientProfile', required: true },
    patientId: { type: String, required: true }, // Added from partner's code
    prescriptionId: { type: String, required: true }, 
    doctorName: { type: String }, // Can map to prescribedBy
    hospital: { type: String },       
    diagnosis: { type: String },      
    dateIssued: { type: Date, default: Date.now },
    notes: { type: String }, // Added from partner's code
    medications: [{
        name: { type: String },       
        dosage: { type: String },    
        frequency: { type: String },  
        duration: { type: String }    
    }]
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);