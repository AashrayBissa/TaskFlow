const mongoose = require('mongoose');

connectDB().then(console.log("Database Working!!")).catch(err => console.log(err));

async function connectDB() {
  await mongoose.connect('mongodb://127.0.0.1:27017/taskflow');
}

module.exports = connectDB;

