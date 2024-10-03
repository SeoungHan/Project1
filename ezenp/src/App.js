import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './movie/HomePage';
import Choice from './movie/Choice';
import Buy from './movie/Buy';
import Rent from './movie/Rent';

const App = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '10px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Choice" element={<Choice />} />
          <Route path="/Rent" element={<Rent />} />
          <Route path="/Buy" element={<Buy />} />
        </Routes>
      </div>
      <div style={{ flex: 1 }}></div>
    </div>
  );
};

export default App;
