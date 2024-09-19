// import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DreamPage from './DreamComponent/DreamPage.js'
import LoginPage from './LoginComponent/LoginPage.js'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dream" element={<DreamPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
