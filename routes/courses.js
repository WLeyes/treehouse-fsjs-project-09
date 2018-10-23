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