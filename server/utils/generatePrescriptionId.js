const Counter = require('../models/Counter');

const generatePrescriptionId = async () => {
    const year = new Date().getFullYear();
    const counter = await Counter.findOneAndUpdate(
        { _id: 'prescriptionId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    const padded = String(counter.seq).padStart(3, '0');
    return `RX-${year}-${padded}`;
};

module.exports = generatePrescriptionId;