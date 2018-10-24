'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  user: [ {type: mongoose.Schema.Types.ObjectId, ref: 'User'} ], 
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  estimatedTime: {
    type: String,
    required: false,
  },
  materialsNeeded: {
    type: String,
    required: false,
  }
});


const Course = mongoose.model("Course", CourseSchema);
module.exports.Course = Course;