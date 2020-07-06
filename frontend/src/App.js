import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Side from './components/Sidebar/Sidebar';



const App = () => {
  return (
    <div className='app-wrapper'>
      <Header />
      <Side />
      <Profile />
    </div>
  );
}






export default App;
