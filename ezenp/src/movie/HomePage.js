import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Choice from './Choice';

const HomePage = () => {
  return (
    <div>
      <h1>홈페이지입니다</h1>
      <ul>
        <li>
          <Link to="./Choice">추천 영화</Link>
        </li>
        <li>
          <Link to="./Rent">대여중인 영화</Link>
        </li>
        <li>
          <Link to="./Buy">구매한 영화</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
