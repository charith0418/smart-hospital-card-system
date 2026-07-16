const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    medicineCode: { type: String, required: true, unique: true },
    medicineName: { type: String, required: true },
    categoryClass: { type: String, required: true, enum: [
        'Analgesic (Pain Relief)',
        'Antibiotic',
        'Antihistamine (Allergy)',
        'Antidiabetic',
        'Antihypertensive (BP)',
        'NSAID (Anti-inflammatory)',
        'Antipyretic (Fever)',
        'Vitamins & Minerals',
        'General Medical Item'
    ]},
    unitForm: { type: String, required: true, enum: [
        'Tablets', 'Capsules', 'Bottles', 'Ampoules', 'Ointments'
    ]},
    quantity: { type: Number, required: true, default: 0 },
    storageLocation: { type: String, required: true },
    reorderLevel: { type: Number, default: 20 }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);