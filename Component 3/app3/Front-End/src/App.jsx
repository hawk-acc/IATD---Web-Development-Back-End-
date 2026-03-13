// src/App.jsx
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CourseList from './CourseList';
import CoursePage from './CoursePage';
import './styles.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/course/:slug" element={<CoursePage />} />
      </Routes>
    </Router>
  );
};

export default App;