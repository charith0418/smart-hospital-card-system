const Medicine = require('../models/Medicine');

const generateMedicineCode = async () => {
    const count = await Medicine.countDocuments();
    const padded = String(count + 1).padStart(3, '0');
    return `MED-${padded}`;
};

module.exports = generateMedicineCode;