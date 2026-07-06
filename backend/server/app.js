const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Enable CORS for React frontend
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
})); 

// Parse incoming JSON payloads
app.use(express.json()); 

// Application API Routes
app.use('/api/auth', authRoutes);

// Health Check Test Route
app.get('/', (req, res) => {
  res.send('Medicare Hospital API is running smoothly...');
});

module.exports = app;