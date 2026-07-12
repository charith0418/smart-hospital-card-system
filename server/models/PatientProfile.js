const mongoose = require('mongoose');

const patientProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    patientId: { type: String, required: true, unique: true }, 
    fullName: { type: String, required: true },
    bloodGroup: { type: String },
    dob: { type: Date },
    phone: { type: String },
    address: { type: String },
    gender: { type: String },
    qrCodeData: { type: String },
    
    medicalHistory: {
        diagnoses: [{
            diagnosis: { type: String }, // e.g., "Hypertension"
            doctor: { type: String },    // e.g., "Dr. N. Silva"
            date: { type: Date }         // e.g., "2026-04-12"
            // Note: 'status' field intentionally omitted based on your requirements
        }],
        surgeries: [{
            procedure: { type: String }, // e.g., "Appendectomy"
            year: { type: String }       // e.g., "2022"
        }],
        allergies: [{ 
            type: String                 // e.g., "Penicillin", "Seafood"
        }],
        vaccinations: [{
            name: { type: String },      // e.g., "Covid-19 Booster"
            year: { type: String }       // e.g., "2025"
        }]
    },
    prescriptions: [{
        medications: [{
            name: { type: String },               
            dosageInstructions: { type: String }, 
            duration: { type: String }            
        }],
        dateIssued: { type: Date, default: Date.now }
    }],
    emergencyContact: {
        name: { type: String },
        relation: { type: String },
        phone: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.model('PatientProfile', patientProfileSchema);