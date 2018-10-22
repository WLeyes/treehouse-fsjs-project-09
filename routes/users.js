'use strict'

const express = require("express");
const router = express.Router();
const User = require("../models/models").User;

// CREATE


// READ
router.get('/', (req, res, next) => {
  User.find({})
  .sort({createdAt: -1})
  .exec(function(err, users){
    if(err) return next(err);
    res.json(users);
  });
});

// UPDATE

// DELETE

module.exports = router;