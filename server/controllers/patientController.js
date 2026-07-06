const patientService = require('../services/patientService');

const getDashboard = async (req, res) => {
    try {
        const userId = req.user._id;
        const userEmail = req.user.email; 
        const dashboardData = await patientService.getPatientDashboardData(userId, userEmail);

        res.status(200).json(dashboardData);

    } catch (error) {
        console.error("Dashboard Fetch Error:", error.message);
        
        if (error.message === 'Patient profile not found') {
            return res.status(404).json({ message: 'Patient profile not found. Please contact hospital staff.' });
        }
        
        res.status(500).json({ message: 'Server error while fetching dashboard data' });
    }
};

module.exports = { getDashboard };