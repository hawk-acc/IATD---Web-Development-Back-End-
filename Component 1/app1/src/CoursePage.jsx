import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './styles.css';
import courses from './data';


function CoursePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const buttonIdentifier = Number(new URLSearchParams(location.search).get('button'));
  const selectedCourse = courses.find(course => course.id === buttonIdentifier);


  const handleGoBack = () => {
    navigate('/');
  };

  //In case, if the selectedCourse is not found
  if (!selectedCourse) {
    return <p>Course not found.</p>;
  }

  return (
    <div className='container'>
        <div>
            <button onClick={handleGoBack} className="app-button-hover-effect">Exit to Main Page</button>
        </div>
        <div className='form'>
            <p>{selectedCourse.name}</p>
            <img src={selectedCourse.picture} alt={selectedCourse.name} width="500" height="333"></img>
            <p>{selectedCourse.description}</p>
            <ul>
                {selectedCourse.modules.map((m, index)=>(
                    <li key={index}>{m}</li>
                ))}
            </ul>
            <p>
                 <button className="app-button-hover-effect">Enrol now</button>
            </p>
        </div>

    </div>
  )

}

export default CoursePage;