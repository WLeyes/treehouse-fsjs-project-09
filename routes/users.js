'use strict'

const express = require("express");
const router = express.Router();
const User = require("../models/User").User;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const auth = require('basic-auth');

// CREATE - POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
router.post('/', (req, res, next) => {
  // based on https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if( emailRegex.test(req.body.emailAddress) ){
    if(!req.body.emailAddress){
      const error = new Error('The e-mail field cannot be empty.');
      error.status = 400;
      return next(error);
    }
  
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
            res.location('/');
            res.sendStatus(201);
          }
        });
  
       } else {
        let error = new Error('Title and description are required.');
        error.status = 400;
        return next(error); 
       }
  } else {
    let error = new Error('Invalid email address format');
    error.status = 400;
    return next(error); 
  }
});

// Middleware Returns the currently authenticated user || todo: fix if username is wrong
router.use( (req, res, next) => {
  auth(req) ?
    User.findOne({  emailAddress: auth(req).name })
      .exec( function(err, user) {
        if(user){
          if(bcrypt.compareSync(auth(req).pass, user.password)){
            console.log('Passwords match');
            req.user = user;
            next();
          } else {
            console.log('Passwords do not match');
            const error = new Error("Your password is not valid");
            error.status  = 401;
            next(error);
          }
        } else {
          console.log('Invalid user');
            const error = new Error("Invalid user");
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
    .exec(function(err, user){
      if(err) return next(err);
      res.json(req.user);
    });
});

// UPDATE

// DELETE

module.exports = router;