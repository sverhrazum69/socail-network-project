import React, { useState, useEffect } from 'react';
import './Layaout.css';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux'
import axios from 'axios'
import { withRouter } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import * as actions from '../../store/actions/auth'
import FirendList from '../../components/FriendList/FriendList';
import UserDescription from '../../components/UserDescription/UserDescription';
import FriendRequests from '../../components/FriendRequests/FriendRequests';
import { Redirect } from 'react-router-dom';


const { Header, Sider, Content } = Layout;

const SiderDemo = props => {

  const host = "http://" + window.location.hostname + ":3000/"
  console.log(props)

  const displayUser = props.match.params.username

  const [collapsed, setState] = useState(false)
//  const [userData, updateData] = useState({})
  //const [pageContent, updateContent] = useState()
  /*const updateInfo = () => {
    const getData = async () => {
      
      const response = await axios.get('http://localhost:8000/api/users/' + displayUser + '/')

      updateContent(
        <>
          <UserDescription userInfo={response.data} updateUserData={updateInfo} />
          <FirendList userInfo={response.data} />)
        </>
      )


      updateData(response.data)
      return response.data
    }
    getData().then(() => {
      
    }).catch(e => console.log(e.response))
  }*/
  const toggle = () => {
    setState(!collapsed);
  };

  const handleLogout = () => {
    props.logout()
    props.history.push("/login")
  }

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      props.history.push("/login")
    }
  })

 /* useEffect(() => {
    const getData = async () => {
      
      const response = await axios.get('http://localhost:8000/api/users/' + displayUser + '/')

      updateContent(
        <>
          <UserDescription userInfo={response.data} updateUserData={updateInfo} />
          <FirendList userInfo={response.data} />)
        </>
      )
      updateData(response.data)
      console.log(response.data);
      
      return response.data
    }
    getData().then(() => {
    
    }).catch(e => console.log(e.response))
  }, [displayUser])*/




  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />} onClick={() => { 
            
            props.history.push("../../"+ localStorage.username + "/profile/")
       //   updateInfo()  
        }}>
            User profile
                  </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />} onClick={() => {
             props.history.push("../../"+ localStorage.username +"/friendRequests/")
          /*  updateContent(
            <>
              <FriendRequests userID={userData.id}/>
            </>
            )*/
          }
          }>
            Friend requestss
            </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />} onClick={handleLogout}>
            logout
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 300,
          }}
        >
        {props.children}
        {console.log(props.history)}
        </Content>
      </Layout>
    </Layout>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(SiderDemo))