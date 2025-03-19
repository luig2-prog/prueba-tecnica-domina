const mongoose = require('mongoose');
const config = require('../../../config/config');

const connectAuthDB = async () => {
  try {
    await mongoose.connect(config.mongoUriAuth);
    console.log('Connected to MongoDB (Auth)');
  } catch (error) {
    console.error('Could not connect to MongoDB (Auth)', error);
    process.exit(1);
  }
};

const connectTasksDB = async () => {
  try {
    const tasksConnection = mongoose.createConnection(config.mongoUriTasks);
    console.log('Connected to MongoDB (Tasks)');
    return tasksConnection;
  } catch (error) {
    console.error('Could not connect to MongoDB (Tasks)', error);
    process.exit(1);
  }
};

module.exports = { connectAuthDB, connectTasksDB };