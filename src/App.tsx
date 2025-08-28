import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import StoryGenerator from './components/StoryGenerator';
import CustomGenreRequest from './components/CustomGenreRequest';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generator" element={<StoryGenerator />} />
          <Route path="/custom-genre" element={<CustomGenreRequest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
