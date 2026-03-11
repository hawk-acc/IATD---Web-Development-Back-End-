// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CourseList from './CourseList';
import CoursePage from './CoursePage';
import courses from './data';
import './styles.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/main" element={<CoursePage />} />
      </Routes>
    </Router>
  );
};

export default App;