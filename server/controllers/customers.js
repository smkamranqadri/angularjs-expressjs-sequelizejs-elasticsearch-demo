'use strict';

const { customers } = require('../models');
const { responseHandler } = require('../config/utils');
const { search } = require('../config/elasticsearch');

const list = function(req, res) {
  let body = {
    size: 200,
    from: 0
  };
  if (req.query['q'])
    body.query = {
      simple_query_string: {
        query: req.query['q'],
        fields: [
          'customerName',
          'contactFirstName',
          'contactLastName',
          'phone'
        ],
        default_operator: 'and'
      }
    };
  search('customers', body)
    .then(function(results) {
      const records = results.hits.hits.map(function(record) {
        return record._source;
      });
      responseHandler.successHanlder(res, records);
    })
    .catch(function(err) {
      responseHandler.serverErrorHanlder(res, err);
    });
};

const create = function(req, res) {
  const { customerName, contactLastName, contactFirstName, phone } = req.body;
  if (!customerName && !contactFirstName && !contactLastName && !phone)
    responseHandler.errorHanlder(res, 'Missing fields!');
  customers
    .create({
      customerName,
      contactLastName,
      contactFirstName,
      phone
    })
    .then(function(record) {
      responseHandler.successHanlder(res, record);
    })
    .catch(function(err) {
      responseHandler.serverErrorHanlder(res, err);
    });
};

module.exports = {
  list,
  create
};
