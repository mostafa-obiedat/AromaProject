'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const { Donation, Donor, User } = require("../models");

 
// Get the current file name and environment configuration
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];  // Assuming config.json is at root level

// Create an empty object to store the models
const db = {};

// Create the Sequelize instance with database connection settings
let sequelize;
if (config.use_env_variable) {
  // If we use an environment variable for DB connection string
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Use the config file to connect
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read all files in the current directory (models directory), excluding the current file (index.js)
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&  // Ignore hidden files (starting with '.')
      file !== basename &&  // Ignore the current file (index.js)
      file.slice(-3) === '.js' &&  // Only include .js files
      file.indexOf('.test.js') === -1  // Exclude test files
    );
  })
  .forEach(file => {
    // Dynamically import each model
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;  // Add the model to the db object
  });

// Set up associations between models if any (if models have an associate method)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);  // Pass the db object for relations
  }
});

// Attach Sequelize and Sequelize instance to the db object to allow access in other files
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the db object, which contains all models, Sequelize instance, and methods
module.exports = db;
