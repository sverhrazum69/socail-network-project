import React from 'react';
import './App.css';

import Sidebar from './components/Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';



const App = () => {
  return (
    <div className='app-wrapper'>
      <Header />
      <Sidebar />
      <Profile />
    </div>
  );
}






export default App;
