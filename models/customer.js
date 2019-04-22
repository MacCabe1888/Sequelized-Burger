'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customer_name: {
      type: DataTypes.STRING
    }
  });

  Customer.associate = function(models) {
    Customer.hasMany(models.Burger);
  };

  return Customer;
};
