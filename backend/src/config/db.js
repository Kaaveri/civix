// db.js
const mongodb = require('mongodb');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongodb.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Atlas Connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
