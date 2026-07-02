const mongoose = require('mongoose');

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskflow');
  console.log("Database Working!!");
}

module.exports = connectDB;

