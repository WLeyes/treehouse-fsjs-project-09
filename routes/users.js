'use strict'

const express = require("express");
const router = express.Router();
const User = require("../models/models").User;

const bcrypt = require('bcrypt');
const saltRounds = 10;


// CREATE - POST /api/users
router.post('/', (req, res, next) => {
  if(req.body.firstName &&
     req.body.lastName &&
     req.body.emailAddress &&
     req.body.password){
       const userData = {
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         emailAddress: req.body.emailAddress,
         password: bcrypt.hashSync(req.body.password, saltRounds)
      }

      User.create(userData, function(error){
        if(error){
          return next(error);
        } else {
          return res.redirect('/api/users');
        }
      });
// todo: check if authenticated
     } else {
      let err = new Error(' Title and description are required.');
      err.status = 400;
      return next(err); 
     }
});

// READ - GET /api/users
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