'use strict';

const { addDocument, removeDocument } = require('../config/elasticsearch');

module.exports = function(sequelize, DataTypes) {
  const customers = sequelize.define(
    'customers',
    {
      customerNumber: DataTypes.INTEGER,
      customerName: DataTypes.STRING,
      contactLastName: DataTypes.STRING,
      contactFirstName: DataTypes.STRING,
      phone: DataTypes.STRING,
      addressLine1: DataTypes.STRING,
      addressLine2: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      country: DataTypes.STRING,
      salesRepEmployeeNumber: DataTypes.INTEGER,
      creditLimit: DataTypes.FLOAT
    },
    {}
  );
  customers.associate = function(models) {
    // associations can be defined here
  };

  const saveDocument = function(instance) {
    const document = instance.dataValues;
    return addDocument(document.id, 'customers', {
      customerName: document.customerName,
      contactLastName: document.contactLastName,
      contactFirstName: document.contactFirstName,
      phone: document.phone
    });
  };

  const destroyDocument = function(instance) {
    return removeDocument(instance.id);
  };

  customers.addHook('afterCreate', saveDocument);
  customers.addHook('afterUpdate', saveDocument);
  customers.addHook('afterDestroy', destroyDocument);

  return customers;
};
