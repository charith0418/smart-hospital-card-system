const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const treatmentRoutes = require('./routes/treatmentRoutes');
const reportRoutes = require('./routes/reportRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
// Optional: Include medicineRoutes if your partner actually built the file
// const medicineRoutes = require('./routes/medicineRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Base route updated to plural /patients for consistency
app.use('/api/patients', patientRoutes);

app.use('/api/treatments', treatmentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

// app.use('/api/medicines', medicineRoutes);

app.get('/', (req, res) => {
    res.send('Medicare Hospital API is running...');
});

module.exports = app;