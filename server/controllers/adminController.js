const Doctor = require('../models/Doctor');
const Staff = require('../models/Staff');
const User = require('../models/User');



const getDashboardStats = async (req, res) => {
    try {
        const totalPatients = await PatientProfile.countDocuments();
        const totalDoctors = await Doctor.countDocuments();
        const totalStaff = await Staff.countDocuments();

        res.status(200).json({
            patients: totalPatients,
            doctors: totalDoctors,
            staff: totalStaff
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
};



const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().sort({ createdAt: -1 });
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors', error: error.message });
    }
};

const createDoctor = async (req, res) => {
    const { doctorId, firstName, lastName, email, phone, nic, specialization, medicalLicenseNo, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email already registered' });

        const newUser = await User.create({ email, password, role: 'Doctor' });

     
        const newDoctor = await Doctor.create({
            user: newUser._id,
            doctorId, firstName, lastName, email, phone, nic, specialization, medicalLicenseNo
        });

        res.status(201).json({ message: 'Doctor created successfully', doctor: newDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Error creating doctor', error: error.message });
    }
};


const updateDoctor = async (req, res) => {
    const { password, ...doctorData } = req.body;
    
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

        if (password && password.trim() !== "") {
            const user = await User.findById(doctor.user);
            if (user) {
                user.password = password;
                await user.save(); 
            }
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, doctorData, { new: true });
        res.status(200).json({ message: 'Doctor updated successfully', doctor: updatedDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Error updating doctor', error: error.message });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

        
        await User.findByIdAndDelete(doctor.user);
        await Doctor.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting doctor', error: error.message });
    }
};


const getStaff = async (req, res) => {
    try {
        const staff = await Staff.find().sort({ createdAt: -1 });
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching staff', error: error.message });
    }
};

const createStaff = async (req, res) => {
    const { staffId, firstName, lastName, email, phone, nic, role, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email already registered' });

    
        const newUser = await User.create({ email, password, role: 'Staff' });

        
        const newStaff = await Staff.create({
            user: newUser._id,
            staffId, firstName, lastName, email, phone, nic, role
        });

        res.status(201).json({ message: 'Staff created successfully', staff: newStaff });
    } catch (error) {
        res.status(500).json({ message: 'Error creating staff', error: error.message });
    }
};

const updateStaff = async (req, res) => {
    const { password, ...staffData } = req.body;

    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff) return res.status(404).json({ message: 'Staff not found' });
        if (password && password.trim() !== "") {
            const user = await User.findById(staff.user);
            if (user) {
                user.password = password;
                await user.save(); 
            }
        }
        const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, staffData, { new: true });
        res.status(200).json({ message: 'Staff updated successfully', staff: updatedStaff });
    } catch (error) {
        res.status(500).json({ message: 'Error updating staff', error: error.message });
    }
};

const deleteStaff = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff) return res.status(404).json({ message: 'Staff not found' });

       
        await User.findByIdAndDelete(staff.user);
        await Staff.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Staff deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting staff', error: error.message });
    }
};

module.exports = {
    getDashboardStats,
    getDoctors, createDoctor, updateDoctor, deleteDoctor,
    getStaff, createStaff, updateStaff, deleteStaff
};