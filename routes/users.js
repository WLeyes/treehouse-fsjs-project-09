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

// RMiddleware Returns the currently authenticated user
router.use( (req, res, next) => {
  User.findOne({  emailAddress: auth(req) })
    .exec( (err, user)=> {
      console.log(auth(req));
      console.log(user);
      if(user){
        bcrypt.compare( auth(req).pass, user.password, (err, user) => {
          
        });
      } else {
        next();
      } 
    })
});

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