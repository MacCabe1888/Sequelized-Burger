const connection = require("./connection");

const orm = {
  selectAll: function(table, cb) {
    let queryString = "SELECT * FROM ??";
    connection.query(queryString, [table], function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  insertOne: function(table, columns, values, cb) {
    var queryString = "INSERT INTO ?? (??) VALUES (?)";
    connection.query(queryString, [table, columns, values], function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  updateOne: function(table, objColVals, condition, cb) {
    let queryString = "UPDATE ?? SET ? WHERE ?";
    connection.query(queryString, [table, objColVals, condition], function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  deleteOne: function(table, condition, cb) {
    let queryString = "DELETE FROM ?? WHERE ?";
    connection.query(queryString, [table, condition], function(err, result) {
      if (err) throw err;
      cb(result);
    });
  }
};

module.exports = orm;
