'use strict'

const express = require("express");
const router = express.Router();
const Course = require("../models/Course").Course;
const User = require("../models/User").User;
const bcrypt = require('bcrypt');

const auth = require('basic-auth');

router.param("cID", function(req, res, next, id){
  if (id.match(/^[0-9a-fA-F]{24}$/)) { // Check that id is a valid ObjectId
    Course.findById(id, function(error,doc){
      if(error) return next(error);
      if(!doc){
        const error = new Error("Not Found");
        error.status = 404;
        return next(error);
      }
      req.course = doc;
      return next();
    });
  } else {
    const error = new Error("Not Found");
    error.status = 404;
    return next(error);
  }
  
});

// Middleware Returns the currently authenticated user || todo: fix if username is wrong
router.use( (req, res, next) => {
  auth(req) ?
    User.findOne({  emailAddress: auth(req).name })
      .exec( function(error, user) {
        if(user){
          if(bcrypt.compareSync(auth(req).pass, user.password)){
            console.log('Passwords match');
            req.user = user;
            return next();
          } else {
            console.log('Passwords do not match');
            const error = new Error("Your password is not valid");
            error.status = 401;
            return next(error);
          }
        } else {
          console.log('Invalid user');
            const error = new Error("Invalid user");
            error.status = 401;
            return next(error);
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
          res.location('/');
          res.sendStatus(201);
        }
      });
    } else {
      const error = new Error('Please login to create post.');
      error.status = 400;
      return next(error); 
    }

    } else {
      const error = new Error('Title and description are required.');
      error.status = 400;
      return next(error); 
    }
    console.log(req.body);
});

// READ - GET /api/courses 200 - Returns a list of courses (including the user that owns each )
router.get('/', (req, res, next) => {
  Course.find({})
  .sort({createdAt: -1})
  .populate('user', 'firstName lastName')
  .exec(function(error, courses){
    if(error) return next(error);
    res.json(courses);
  });
});

// READ - GET /api/courses/:id 200 - Returns a the course (including the user that owns the course) for the provided course ID
router.get('/:cID', (req, res, next) => {
  res.json(req.course);
});

// UPDATE - PUT /api/courses/:id 204 - Updates a course and returns no content
router.put('/:cID', (req, res, next) => {
  console.log(`req.user: ${req.user._id}`);
  console.log(`req.body.user: ${req.body.user}`);
  console.log(`res.body: ${res.body}`);
  if(req.user){
    if(req.user._id.toString() === req.body.user.toString()){
      console.log('is owner');

      Course.findOneAndUpdate(
        { "_id": req.body._id },
        { "$set": {
          "title": req.body.title,
          "description": req.body.description,
          "estimatedTime": req.body.estimatedTime,
          "materialsNeeded": req.body.materialsNeeded
        }})
        .exec(function(error, course){
        if(error) {
            console.log(error);
            console.log('is not the owner');
            return next();
        } else {
          console.log(`course: "${req.body.title}" has been updated.`);
          return res.sendStatus(204);
        }
     }); 
      
    }
  } else {
    const error = new Error('Please login to update post.');
    error.status = 400;
    return next(error); 
  }
});

// DELETE - DELETE /api/courses/:id 204 - Deletes a course and returns no content
router.delete('/:cID', (req, res, next) => {
  if(req.user){
    if(req.course.user.toString() === req.user._id.toString()){
      console.log('is owner');
      req.course.remove();
      return res.sendStatus(204);
    } else{
      console.log('is not the owner');
      return next();
    }
  } else {
    const error = new Error('Please login to delete post.');
    error.status = 400;
    return next(error); 
  }
});

module.exports = router;