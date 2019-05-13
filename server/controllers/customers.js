'use strict';

const Customers = require('../models').customers;

const getAll = function(req, res) {
  Customers.findAll().then(function(records) {
    res.send(records);
  });
};

module.exports = {
  getAll
};
