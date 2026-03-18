import React from 'react';
import courses from './data';
import './styles.css';
import {useNavigate} from 'react-router-dom';

const CourseList = () => {
  const navigate = useNavigate();

  const handleButtonClick = (identifier) => {
    navigate(`/main?button=${identifier}`);
  };
  return (
    <div>
      <h1>Available Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <img src={course.picture} alt={course.name} width="500" height="333"></img>
            <p>{course.name}</p>
            <p>{course.brief}</p>
            <p>{course.hours}</p>
            <p>
              <button className="app-button-hover-effect" onClick={()=>handleButtonClick(course.id)}>
                More Information
              </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;