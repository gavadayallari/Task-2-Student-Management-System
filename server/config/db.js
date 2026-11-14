const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let mongoUri = (process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studenthub').trim();
    
    // Auto-clean if accidentally pasted with "MONGODB_URI=" prefix or wrapped in quotes
    if (mongoUri.startsWith('MONGODB_URI=')) {
      mongoUri = mongoUri.replace(/^MONGODB_URI=/, '').trim();
    }
    mongoUri = mongoUri.replace(/^["']|["']$/g, '').trim();

    const conn = await mongoose.connect(mongoUri, {
      dbName: 'studentdb',
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`[MongoDB Connected] Host: ${conn.connection.host} | Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB Connection Error] ${error.message}`);
    console.error('Make sure MongoDB service is running locally or MONGODB_URI is valid.');
    // Don't kill process immediately if we want friendly error responses
    return null;
  }
};

module.exports = connectDB;
