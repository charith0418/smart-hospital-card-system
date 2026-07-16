const express = require('express');
const router = express.Router();
const { addMedicine, getAllMedicines, searchMedicines } = require('../controllers/medicineController');

router.post('/', addMedicine);
router.get('/', getAllMedicines);
router.get('/search', searchMedicines);

module.exports = router;