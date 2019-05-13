'use strict';
module.exports = (sequelize, DataTypes) => {
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
  return customers;
};
