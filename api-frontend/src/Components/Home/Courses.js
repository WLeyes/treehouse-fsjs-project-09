import React, { Component } from 'react'
import Axios from 'axios';
import Slide from 'react-reveal/Slide';

export default class Courses extends Component {

  state = {
    courses: []
  }

  componentDidMount(){
    Axios.get('http://localhost:5000/api/courses')
    .then(res => {
      let newCourseData = res.data;
      this.setState({ courses: newCourseData });
      console.log(res.data);
    });
  }

  showCourses = courses => (
    courses ?
    courses.map( course => (
      <Slide left key={course.title}>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </Slide>
    ))
    : <div><h1>Null</h1></div>
)


  render() {
    return (
      <div>
        {this.showCourses(this.state.courses)}
      </div>
    )
  }
}
