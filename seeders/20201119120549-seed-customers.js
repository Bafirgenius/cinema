'use strict';

const customers = require("../data/customers.json");

for (let i = 0; i < customers.length; i++) {
  customers[i].createdAt = new Date();
  customers[i].updatedAt = new Date();
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Customers", customers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Customers", null, {});
  }
};