const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    medicineCode: { type: String, required: true, unique: true },
    medicineName: { type: String, required: true },
    categoryClass: { type: String, required: true },
    unitForm: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    storageLocation: { type: String, required: true },
    reorderLevel: { type: Number, default: 20 }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);