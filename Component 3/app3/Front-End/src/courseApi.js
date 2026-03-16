import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

//function to fetch courses
export async function fetchCourses(){
    try {
        const response = await axios.get(`${BASE_URL}/courses`);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
}

//function to fetch courses
export async function fetchCourseById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}
