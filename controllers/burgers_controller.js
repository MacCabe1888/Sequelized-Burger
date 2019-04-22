const express = require("express");

const router = express.Router();

// Import the model to use its database functions.
const db = require("../models");

// Create all our routes and set up logic within those routes where required.

router.get("/", function(req, res) {
  db.Burger.findAll({include: [db.Customer]}).then(function(data) {
    const hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

router.get("/api/burgers", function(req, res) {
  db.Burger.findAll().then(function(data) {
    res.json(data);
  });
});

router.post("/api/customers/:customer_name", function(req, res) {
  db.Customer.findOne({
    raw: true,
    where: {
      customer_name: req.params.customer_name
    }
  }).then(function(data) {
    if (data === null) {
      db.Customer.create({
        customer_name: req.params.customer_name
      }).then(function(data) {
        res.json(data);
      });
    } else {
      res.json(data);
    }
  });
});

router.post("/api/burgers", function(req, res) {
  db.Burger.create({
    burger_name: req.body.burger_name
  }).then(function(data) {
    res.json(data);
  });
});

router.put("/api/burgers/:id", function(req, res) {
  db.Customer.findOne({
    raw: true,
    where: {
      customer_name: req.body.customer_name
    }
  }).then(function(data) {
    const CustomerId = data.id;
    db.Burger.update({
      devoured: true,
      CustomerId: CustomerId
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      if (data.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404.
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  db.Burger.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(data) {
    if (data.affectedRows == 0) {
      // If no rows were affected, then the ID must not exist, so 404.
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
