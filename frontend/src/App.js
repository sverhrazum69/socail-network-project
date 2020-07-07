import React from 'react';
import './App.css';
import 'antd/dist/antd.css'


import SiderDemo from './containers/Layaout/Layout';
import UserDescription from './components/UserDescription/UserDescription';
import FirendList from './containers/FriendList/FriendList';




const App = () => {
  return (
    <div className='app-wrapper'>
      <SiderDemo>
        <UserDescription />
        <FirendList />
      </SiderDemo>
    </div>
  );
}






export default App;
