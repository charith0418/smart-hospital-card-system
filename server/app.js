// const express = require('express');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const patientRoutes = require('./routes/patientRoutes');
// const treatmentRoutes = require('./routes/treatmentRoutes');
// const reportRoutes = require('./routes/reportRoutes');
// const app = express();
// app.use(cors()); 
// app.use(express.json()); 
// app.use('/api/treatments', treatmentRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/patients', patientRoutes);
// app.use('/api/reports', reportRoutes);
// app.get('/', (req, res) => {
//     res.send('Medicare Hospital API is running...');
// });
// module.exports = app;
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const treatmentRoutes = require('./routes/treatmentRoutes');
const reportRoutes = require('./routes/reportRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const medicineRoutes = require('./routes/medicineRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/treatments', treatmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
    res.send('Medicare Hospital API is running...');
});

module.exports = app;