import React from 'react';

const CoursesBlock = ({ course }) => {
  return (
    <div style={{
      padding: '0 10px'
    }}>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
    </div>
  );
};

export default CoursesBlock;