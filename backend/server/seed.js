const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const PatientProfile = require('./models/PatientProfile');

// Load environment variables
dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hospital_system';

async function seedDB() {
  try {
    console.log(`Connecting to: ${mongoURI}`);
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB for seeding...');

    // 1. Clear out stale data to avoid duplicate key errors
    await User.deleteMany({});
    await PatientProfile.deleteMany({});
    console.log('Cleared old users and patient profiles.');

    const rawPassword = 'password123';

    // ==========================================
    // 2. SEED ADMIN (User credentials only)
    // ==========================================
    const adminUser = new User({
      email: 'admin@example.com',
      password: rawPassword,
      role: 'Admin'
    });
    await adminUser.save();
    console.log('🎉 Created Admin User login credentials.');

    // ==========================================
    // 3. SEED PATIENT (User + Profile)
    // ==========================================
    const patientEmail = 'patient@example.com';
    const patientNic = '199512345678';
    
    const patientUser = new User({
      email: patientEmail.toLowerCase(),
      password: rawPassword,
      role: 'Patient'
    });
    const savedPatientUser = await patientUser.save();
    console.log('🎉 Created Patient User login credentials.');

    const generatedId = 'PAT-582194';
    const qrData = `MEDNET-VALIDATION-NODE-${generatedId}-${patientNic}`;

    await PatientProfile.create({
      user: savedPatientUser._id,
      patientId: generatedId,
      fullName: 'John Doe',
      nic: patientNic,
      dob: new Date('1995-05-15'),
      gender: 'Male',
      phone: '0712345678',
      bloodGroup: 'O+',
      address: '123 Main Street, Colombo',
      email: patientEmail.toLowerCase(),
      password: rawPassword,
      guardianName: 'Jane Doe',
      guardianPhone: '0771234567',
      qrCodeData: qrData
    });
    console.log('🎉 Created Patient Profile linked to Patient User.');

    // ==========================================
    // 4. SEED DOCTOR (User credentials only)
    // ==========================================
    const doctorUser = new User({
      email: 'doctor@example.com',
      password: rawPassword,
      role: 'Doctor'
    });
    await doctorUser.save();
    console.log('🎉 Created Doctor User login credentials.');

    // ==========================================
    // 5. SEED STAFF (User credentials only)
    // ==========================================
    const staffUser = new User({
      email: 'staff@example.com',
      password: rawPassword,
      role: 'Staff'
    });
    await staffUser.save();
    console.log('🎉 Created Staff User login credentials.');

    console.log('\n🌟 Database seeded successfully!');
    console.log('-----------------------------------------');
    console.log('You can now log in using:');
    console.log('👉 Admin:   admin@example.com   / password123');
    console.log('👉 Patient: patient@example.com / password123');
    console.log('👉 Doctor:  doctor@example.com  / password123');
    console.log('👉 Staff:   staff@example.com   / password123');
    console.log('-----------------------------------------');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seedDB();