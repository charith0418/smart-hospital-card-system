const mongoose = require('mongoose');
const PatientProfile = require('../models/PatientProfile');
const User = require('../models/User');

// 1. GET ALL PATIENTS
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await PatientProfile.find({})
      .select('-password')
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      data: patients
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve records from database",
      error: error.message
    });
  }
};

// 2. SEARCH PATIENTS (By PAT-ID, Name, NIC, or Phone)
exports.searchPatients = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(200).json([]);
    }

    // Escape special regex characters to prevent regex injection attacks
    const sanitizedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const searchRegex = new RegExp(sanitizedQuery, 'i');

    const patients = await PatientProfile.find({
      $or: [
        { patientId: searchRegex },
        { fullName: searchRegex },
        { phone: searchRegex },
        { nic: searchRegex }
      ]
    }).select('-password');

    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to perform patient search",
      error: error.message
    });
  }
};

// 3. GET PATIENT BY ID (Supports PAT-ID, NIC, or Mongo ObjectId)
exports.getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    let patient = null;

    // A. Search by custom patientId ("PAT-XXXXXX")
    if (id && id.startsWith('PAT-')) {
      patient = await PatientProfile.findOne({ patientId: id })
        .select('-password')
        .populate('prescriptions')
        .populate('history');
    }

    // B. Search by Mongo _id
    if (!patient && mongoose.Types.ObjectId.isValid(id)) {
      patient = await PatientProfile.findById(id)
        .select('-password')
        .populate('prescriptions')
        .populate('history');
    }

    // C. Fallback: Search by NIC or exact string match
    if (!patient) {
      patient = await PatientProfile.findOne({
        $or: [{ patientId: id }, { nic: id }]
      })
        .select('-password')
        .populate('prescriptions')
        .populate('history');
    }

    if (!patient) {
      return res.status(404).json({
        message: `Patient profile matching identifier "${id}" could not be found.`
      });
    }

    return res.status(200).json({
      success: true,
      data: patient
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database error searching profile registry.",
      error: error.message
    });
  }
};

// 4. UPDATE PATIENT (Supports PAT-ID or Mongo ObjectId)
exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      fullName, 
      bloodGroup, 
      phone, 
      dob, 
      address, 
      guardianName, 
      guardianPhone,
      allergies 
    } = req.body;

    // Construct dynamic update object to avoid overwriting fields with undefined
    const updateFields = {};
    if (fullName !== undefined) updateFields.fullName = fullName;
    if (bloodGroup !== undefined) updateFields.bloodGroup = bloodGroup;
    if (phone !== undefined) updateFields.phone = phone;
    if (dob !== undefined) updateFields.dob = dob;
    if (address !== undefined) updateFields.address = address;
    if (guardianName !== undefined) updateFields.guardianName = guardianName;
    if (guardianPhone !== undefined) updateFields.guardianPhone = guardianPhone;

    let updateQuery = { $set: updateFields };

    // Append to allergies array if passed
    if (allergies) {
      updateQuery.$addToSet = { allergies: allergies };
    }

    let updatedProfile = null;

    // A. Update by custom patientId ("PAT-XXXXXX")
    if (id && id.startsWith('PAT-')) {
      updatedProfile = await PatientProfile.findOneAndUpdate(
        { patientId: id },
        updateQuery,
        { new: true, runValidators: true }
      ).select('-password');
    }

    // B. Fallback: Update by Mongo _id
    if (!updatedProfile && mongoose.Types.ObjectId.isValid(id)) {
      updatedProfile = await PatientProfile.findByIdAndUpdate(
        id,
        updateQuery,
        { new: true, runValidators: true }
      ).select('-password');
    }

    if (!updatedProfile) {
      return res.status(404).json({ message: "Patient profile record not found" });
    }

    return res.status(200).json({
      message: "Record updated successfully",
      data: updatedProfile
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database update transaction failed",
      error: error.message
    });
  }
};

// 5. GET DASHBOARD FOR LOGGED-IN PATIENT
exports.getDashboard = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized dashboard access attempt" });
    }

    const profile = await PatientProfile.findOne({ user: req.user._id })
      .select('-password')
      .populate('prescriptions')
      .populate('history');

    if (!profile) return res.status(404).json({ message: "Profile not found" });

    return res.status(200).json({ 
      status: "Success", 
      dashboardData: profile 
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Error fetching dashboard", 
      error: error.message 
    });
  }
};

// 6. CREATE TEST PROFILE WITH LINKED USER ACCOUNT
exports.createTestProfile = async (req, res) => {
  let savedUser = null;

  try {
    const {
      fullName, nic, dob, gender, phone, bloodGroup, address,
      email, password, guardianName, guardianPhone, patientId, qrCodeData
    } = req.body;

    if (!fullName || !nic || !dob || !gender || !phone || !bloodGroup || !address || !email || !password || !guardianName || !guardianPhone) {
      return res.status(400).json({
        message: "Failed creating profile",
        error: "Missing required profile properties, guardian details, or credentials."
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({
        message: "Failed creating profile",
        error: "This email address is already assigned to an account."
      });
    }

    const existingProfile = await PatientProfile.findOne({ $or: [{ nic }, { email: cleanEmail }] });
    if (existingProfile) {
      return res.status(400).json({
        message: "Failed creating profile",
        error: "A medical file entry matching this NIC or Email already exists."
      });
    }

    // Step 1: Create User
    const newUser = new User({
      email: cleanEmail,
      password: password, // Uses pre('save') password hashing in User model
      role: 'Patient'
    });
    savedUser = await newUser.save();

    // Step 2: Generate Tracking IDs
    const generatedId = patientId || `PAT-${Math.floor(100000 + Math.random() * 900000)}`;
    const qrData = qrCodeData || `MEDNET-VALIDATION-NODE-${generatedId}-${nic}`;

    // Step 3: Create Profile (Excludes password field from profile document)
    const newProfile = await PatientProfile.create({
      user: savedUser._id,
      patientId: generatedId,
      fullName,
      nic,
      dob: new Date(dob),
      gender,
      phone,
      bloodGroup,
      address,
      email: cleanEmail,
      guardianName,
      guardianPhone,
      qrCodeData: qrData
    });

    return res.status(201).json({
      message: "Test profile generated successfully",
      data: newProfile
    });
  } catch (error) {
    // Rollback: Delete orphan user if profile creation failed midway
    if (savedUser && savedUser._id) {
      await User.findByIdAndDelete(savedUser._id);
    }

    return res.status(400).json({
      message: "Failed creating profile",
      error: error.message
    });
  }
};