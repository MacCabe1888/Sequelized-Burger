const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger");

// Create all our routes and set up logic within those routes where required.

router.get("/", function(req, res) {
  burger.all(function(data) {
    let hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

router.get("/api/burgers", function(req, res) {
  burger.all(function(data) {
    res.json(data);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create("burger_name", req.body.burger_name, function(result) {
    // Send back the ID of the new burger
    res.json({id: result.insertId});
  });
});

router.put("/api/burgers/:id", function(req, res) {
  burger.update({devoured: true}, {id: req.params.id}, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  burger.delete({id: req.params.id}, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were affected, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
