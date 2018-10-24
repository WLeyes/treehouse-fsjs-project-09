'use strict'

const express = require("express");
const router = express.Router();
const Course = require("../models/Course").Course;

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

// CREATE - POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
router.post('/', (req, res, next) => {
  if(req.body.title &&
    req.body.description){

      const courseData = {
        title: req.body.title,
        description: req.body.description,
        estimatedTime: req.body.estimatedTime,
        materialsNeeded: req.body.materialsNeeded
      }
  
      Course.create(courseData, function(error) {
        if(error){
          return next(error);
        } else {
          return res.redirect('/api/courses');
        }
      });

// todo: check if authenticated
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