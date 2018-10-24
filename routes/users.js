'use strict'

const express = require("express");
const router = express.Router();
const User = require("../models/User").User;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const auth = require('basic-auth');

// CREATE - POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
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
     } else {
      let err = new Error(' Title and description are required.');
      err.status = 400;
      return next(err); 
     }
});

// Middleware Returns the currently authenticated user
router.use( (req, res, next) => {
  console.log(auth(req).name);
  auth(req) ?
    User.findOne({  emailAddress: auth(req).name })
      .exec( function(err, user) {
        if(bcrypt.compareSync(auth(req).pass, user.password)){
          console.log('Passwords match');
          next();
        } else {
          console.log('Passwords do not match');
          const error = new Error("Your password is not valid");
          error.status = 401;
          next(error);
        }
      })
     :next();
  }
);

// READ - GET /api/users 200 - Returns the currently authenticated user
router.get('/', (req, res, next) => {
  User.find({})
    .exec(function(err, users){
      if(err) return next(err);
      res.json(req.user);
    });
});

// UPDATE

// DELETE

module.exports = router;