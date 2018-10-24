'use strict'

const express = require("express");
const router = express.Router();
const Course = require("../models/Course").Course;
const User = require("../models/User").User;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const auth = require('basic-auth');

router.param("cID", function(req, res, next, id){
  Course.findById(id, function(err, doc){
    if(err) return next(err);
    if(!doc){
      err = new Error("Not Found");
      err.status = 404;
      return next(err);
    }
    req.course = doc;
    return next();
  });
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
            error.status = 401;
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

// CREATE - POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
router.post('/', (req, res, next) => {
  if(req.body.title && req.body.description){
    const courseData = {
      user: req.user,
      title: req.body.title,
      description: req.body.description,
      estimatedTime: req.body.estimatedTime,
      materialsNeeded: req.body.materialsNeeded
    }
    if(req.user){
      Course.create(courseData, function(error) {
        if(error){
          return next(error);
        } else {
          return res.redirect('/api/courses');
        }
      });
    } else {
      let err = new Error('Please login to create post.');
      err.status = 400;
      return next(err); 
    }

    } else {
      let err = new Error(' Title and description are required.');
      err.status = 400;
      return next(err); 
    }
    console.log(req.body);
});

// READ - GET /api/courses 200 - Returns a list of courses (including the user that owns each )
router.get('/', (req, res, next) => {
  Course.find({})
  .sort({createdAt: -1})
  .exec(function(err, courses){
    if(err) return next(err);
    res.json(courses);
  });
});

// READ - GET /api/courses/:id 200 - Returns a the course (including the user that owns the course) for the provided course ID
router.get('/:cID', (req, res, next) => {
  res.json(req.course);
});

// UPDATE - PUT /api/courses/:id 204 - Updates a course and returns no content
router.put('/:id', (req, res, next) => {

});

// DELETE - DELETE /api/courses/:id 204 - Deletes a course and returns no content
router.delete('/:id', (req, res, next) => {
  
});

module.exports = router;