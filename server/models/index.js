'use strict';

const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const models = {
  paths: []
};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(function(file) {
    models.paths.push(path.join(__dirname, file));
  });

module.exports = models;
