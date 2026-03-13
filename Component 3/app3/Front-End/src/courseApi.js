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
export async function fetchCourseBySlug(slug) {
  try {
    const response = await axios.get(`${BASE_URL}/courses/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}
