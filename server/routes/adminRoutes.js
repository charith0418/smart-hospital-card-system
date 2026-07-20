const express = require('express');
const router = express.Router();
const { 
    getDashboardStats, 
    getDoctors, createDoctor, updateDoctor, deleteDoctor,
    getStaff, createStaff, updateStaff, deleteStaff 
} = require('../controllers/adminController');


router.get('/dashboard/stats', getDashboardStats);


router.route('/doctors')
    .get(getDoctors)
    .post(createDoctor);

router.route('/doctors/:id')
    .put(updateDoctor)
    .delete(deleteDoctor);


router.route('/staff')
    .get(getStaff)
    .post(createStaff);

router.route('/staff/:id')
    .put(updateStaff)
    .delete(deleteStaff);

module.exports = router;