'use strict'

const express = require("express");
const router = express.Router();
const Course = require("../models/models").Course;

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

// CREATE - POST /api/courses
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

// READ - GET /api/courses
router.get('/', (req, res, next) => {
  Course.find({})
  .sort({createdAt: -1})
  .exec(function(err, courses){
    if(err) return next(err);
    res.json(courses);
  });
});

// READ - GET /api/courses/:id
router.get('/:cID', (req, res, next) => {
  res.json(req.course);
});

// UPDATE - PUT /api/courses/:id
router.put('/:id', (req, res, next) => {

});

// DELETE - DELETE /api/courses/:id
router.delete('/:id', (req, res, next) => {
  
});

module.exports = router;