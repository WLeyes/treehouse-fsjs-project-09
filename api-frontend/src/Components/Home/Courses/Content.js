import React, { Component } from 'react'
import Slide from 'react-reveal/Slide';
import axios from 'axios';

import CoursesBlock from '../../UI/CoursesBlock';

export default class Content extends Component {

  state = {
    courses: []
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/courses")
      .then( response => {
        this.setState({ courses: response.data }); 
      });
  }

  showCourses = (courses) => (
    courses ?
      courses.map( (course) => (
        <Slide left key={course.id}>
              <CoursesBlock course={course} />
        </Slide>
      ))
      :null
  )

  render() {
    return (
      <div>
        {this.showCourses(this.state.courses)};
      </div>
    );
  }
}
