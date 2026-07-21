const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');

router.get('/search', async (req, res) => {
    const { q } = req.query;
    try {
        const medicines = await Medicine.find({
            medicineName: { $regex: q, $options: 'i' }
        }).limit(10);
        res.status(200).json(medicines);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const medicines = await Medicine.find().sort({ medicineName: 1 });
        res.status(200).json(medicines);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;