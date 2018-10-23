'use strict'

const express = require("express");
const router = express.Router();
const User = require("../models/models").User;

// CREATE - GET /register
router.get('/register', (req, res, next) => {
  res.json({message: 'Register today!'});
});

// CREATE - POST /register
router.post('/register', (req, res, next) => {
  res.json({message: 'User created!'});
});

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