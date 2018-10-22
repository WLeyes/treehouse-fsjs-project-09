'use strict'

const express = require("express");
const router = express.Router();
const Course = require("../models/models").Course;

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

// UPDATE - PUT /api/courses/:id
router.put('/:id', (req, res, next) => {

});

// DELETE - DELETE /api/courses/:id
router.delete('/:id', (req, res, next) => {
  
});

module.exports = router;