import React, {useEffect, useState} from 'react';
import {fetchCourses} from './courseApi';
import './styles.css';
import {useNavigate} from 'react-router-dom';

const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData(){
      const coursesData = await fetchCourses();
      setCourses(coursesData);
    }
    fetchData();
  }, []);

  const handleButtonClick = (identifier) => {
    navigate(`/courses/${identifier}`);
  };
  
  return (
    <div>
      <h1>Available Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <img src={`http://localhost:3000${course.picture}`} alt={course.name} width="500" height="333"></img>
            <p>{course.name}</p>
            <p>{course.brief}</p>
            <p>{course.hours}</p>
            <p>
              <button className="app-button-hover-effect" onClick={()=>handleButtonClick(course._id)}>
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