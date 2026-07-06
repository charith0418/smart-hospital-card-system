const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User'); 

dotenv.config();

const seedDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URI); // Added debugging check
    
    // Explicitly configure connection configurations to handle local network configurations safely
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // Force it to crash after 5 seconds instead of hanging forever if it can't reach Mongo
    });
    console.log("Connected to MongoDB for seeding...");

    await User.deleteMany({});
    console.log("Cleared old users.");

    const hashedPassword = await bcrypt.hash('password123', 10);

    const sampleUsers = [
      {
        name: "John Patient",
        email: "patient@hospital.com",
        password: hashedPassword,
        role: "Patient"
      },
      {
        name: "Dr. Smith",
        email: "doctor@hospital.com",
        password: hashedPassword,
        role: "Doctor"
      },
      {
        name: "Sarah Staff",
        email: "staff@hospital.com",
        password: hashedPassword,
        role: "Staff"
      },
      {
        name: "System Admin",
        email: "admin@hospital.com",
        password: hashedPassword,
        role: "Admin"
      }
    ];

    await User.insertMany(sampleUsers);
    console.log("🎉 Success! Database seeded with 4 users.");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();