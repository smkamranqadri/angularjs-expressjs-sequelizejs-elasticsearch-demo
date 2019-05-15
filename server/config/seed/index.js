'use strict';

const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '../../../.env')
});

const database = require('../database');
const elasticsearch = require('../elasticsearch');

const { customers } = require('../../models');
const data = require('./data.json');

try {
  // database connection
  database.sync().then(function() {
    console.log('Database synced!');
    // connecting elastic search
    elasticsearch
      .sync()
      .then(function() {
        console.log('Elasticsearch indexes synced!');
        seed();
      })
      .catch(function(err) {
        console.log('Error whlie setting up elastic search', err);
      });
  });
} catch (err) {
  console.error('Error while seeding: ', err);
}

function seed() {
  const promises = data.map(function(customer) {
    return customers.create({
      customerName: customer.customerName,
      contactLastName: customer.contactLastName,
      contactFirstName: customer.contactFirstName,
      phone: customer.phone
    });
  });
  Promise.all(promises).then(function(results) {
    console.log('Seed Completed!');
  });
}
