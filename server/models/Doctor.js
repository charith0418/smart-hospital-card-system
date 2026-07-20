const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    nic: { type: String, required: true, unique: true },
    specialization: { type: String, required: true },
    medicalLicenseNo: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);