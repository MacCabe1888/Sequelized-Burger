// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm");

const burger = {
  all: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },
  create: function(columns, values, cb) {
    orm.insertOne("burgers", columns, values, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.deleteOne("burgers", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller ("burgers_controller.js").
module.exports = burger;
