const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all in dev, configure for prod
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health Check Endpoint (supports both /api/health and /health)
const healthHandler = (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
  
  res.status(200).json({
    status: 'online',
    appName: 'StudentHub API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: {
      status: states[dbState] || 'Unknown',
      isConnected: dbState === 1,
      name: mongoose.connection.name,
    },
  });
};

app.get('/api/health', healthHandler);
app.get('/health', healthHandler);

// API Routes (supports both /api/... and direct /... endpoints)
app.use('/api/students', studentRoutes);
app.use('/students', studentRoutes);

app.use('/api/dashboard', dashboardRoutes);
app.use('/dashboard', dashboardRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to StudentHub – Student Management System REST API',
    docs: '/api/students',
    health: '/api/health',
    dashboard: '/api/dashboard/stats',
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(` StudentHub Backend Server running on port ${PORT}`);
  console.log(` API Health Check: http://localhost:${PORT}/api/health`);
  console.log(` Students API:     http://localhost:${PORT}/api/students`);
  console.log(` Dashboard API:    http://localhost:${PORT}/api/dashboard/stats`);
  console.log(`===============================================`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
});

module.exports = app;
