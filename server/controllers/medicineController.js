const Medicine = require('../models/Medicine');
const generateMedicineCode = require('../utils/generateMedicineCode');

const addMedicine = async (req, res) => {
    const { medicineName, categoryClass, unitForm, quantity, storageLocation } = req.body;

    try {
        const exists = await Medicine.findOne({ medicineName });
        if (exists) {
            return res.status(400).json({ message: 'Medicine already exists in inventory' });
        }

        const medicineCode = await generateMedicineCode();

        const medicine = await Medicine.create({
            medicineCode,
            medicineName,
            categoryClass,
            unitForm,
            quantity,
            storageLocation
        });

        res.status(201).json({ message: 'Medicine saved to inventory', medicine });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find().sort({ createdAt: -1 });
        const total = medicines.length;
        res.status(200).json({ total, medicines });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const searchMedicines = async (req, res) => {
    const { q } = req.query;
    try {
        const medicines = await Medicine.find({
            $or: [
                { medicineName: { $regex: q, $options: 'i' } },
                { categoryClass: { $regex: q, $options: 'i' } },
                { medicineCode: { $regex: q, $options: 'i' } }
            ]
        });
        res.status(200).json(medicines);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { addMedicine, getAllMedicines, searchMedicines };