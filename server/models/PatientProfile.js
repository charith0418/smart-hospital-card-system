const mongoose = require('mongoose');

const patientProfileSchema = new mongoose.Schema({
    // Changed to false: Staff creates the profile before the patient registers an account
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    patientId: { type: String, required: true, unique: true }, 
    fullName: { type: String, required: true },
    nic: { type: String, required: true, unique: true }, // From Staff Dashboard
    bloodGroup: { type: String },
    dob: { type: Date },
    phone: { type: String },
    address: { type: String },
    gender: { type: String },
    lastVisit: { type: Date }, // From Staff Dashboard
    qrCodeData: { type: String },
    
    // Kept your advanced medical history structure
    medicalHistory: {
        diagnoses: [{
            diagnosis: { type: String }, 
            doctor: { type: String },    
            date: { type: Date }         
        }],
        surgeries: [{
            procedure: { type: String }, 
            year: { type: String }       
        }],
        allergies: [{ 
            type: String                 
        }],
        vaccinations: [{
            name: { type: String },      
            year: { type: String }       
        }]
    },
    emergencyContact: {
        name: { type: String },
        relation: { type: String },
        phone: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.model('PatientProfile', patientProfileSchema);