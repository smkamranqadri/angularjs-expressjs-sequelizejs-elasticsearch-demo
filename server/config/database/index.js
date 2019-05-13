'use strict';

const Sequelize = require('sequelize');

const models = require('../../models');

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
    define: {
      freezeTableName: true,
      timestamps: false
    }
  }
);

models.paths.forEach(function(modelPath) {
  const model = sequelize['import'](modelPath);
  models[model.name] = model;
});

module.exports = sequelize;
