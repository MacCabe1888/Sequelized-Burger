'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Burgers', [{
      burger_name: 'Krusty Burger',
      devoured: false
    }, {
      burger_name: 'Krabby Patty',
      devoured: false
    }, {
      burger_name: 'New Bacon-ings',
      devoured: false
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Burgers', null, {});
  }
};
