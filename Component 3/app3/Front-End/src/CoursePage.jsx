import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchCourseById } from './courseApi';
import React, {useEffect, useState } from 'react';
import './styles.css';
//import courses from './data';


function CoursePage() {
  //const location = useLocation();
  const { _id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    async function fetchACourse(){
      const data = await fetchCourseById(_id);
      setCourse(data);
    }
    fetchACourse();
  },[_id]);

  if (!course) return <p>{_id} is not found in the server.</p>
  //const buttonIdentifier = Number(new URLSearchParams(location.search).get('button'));
  //const selectedCourse = courses.find(course => course.slug === buttonIdentifier);


  const handleGoBack = () => {
    navigate('/');
  };



  return (
    <div className='container'>
        <div>
            <button onClick={handleGoBack} className="app-button-hover-effect">Exit to Main Page</button>
        </div>
        <div className='form'>
            <p>{course.name}</p>
            <img src={`http://localhost:3000${course.picture}`} alt={course.name} width="500" height="333"></img>
            <p>{course.description}</p>
            <ul>
                {course.modules.map((m, index)=>(
                    <li key={index}>{m}</li>
                ))}
            </ul>
            <p>Duration: {course.duration} hours</p>
            <p>Instructor: {course.instructor}</p>
            <p>Category: {course.category}</p>

            <p>
                 <button className="app-button-hover-effect">Enrol now</button>
            </p>
            
        </div>

    </div>
  )

}

export default CoursePage;