import React, {useState,useEffect,useRef} from 'react';
import './Layaout.css';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux'
import axios from 'axios'
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


const { Header, Sider, Content } = Layout;




const SiderDemo = props => {

  const displayUser = props.match.params.username

  const getUserInfo = async () => {
    let response = await axios.get('http://localhost:8000/api/users/' + displayUser + '/')
    return response.json()
  }
  
  const [collapsed,setState] = useState(false)
  const [userData,updateData] = useState({})
  const updateInfo = () => {
    const getData = async() => {
      const response = await axios.get('http://localhost:8000/api/users/' + displayUser + '/')
      return response.data
    }
    getData().then(response => {
      updateData(response)
      console.log(userData);
    }).catch(e => console.log(e.response))
  }
  const toggle = () => {
    setState(!collapsed);
  };

  const handleLogout = () => {
    props.logout()
    props.history.push("/login")
  }

  useEffect(() => {
    if (localStorage.getItem('token') === null){
      props.history.push("/login")
    }
  })

  useEffect(() => {
      updateInfo()
 /*   axios.get('http://localhost:8000/api/users/' + displayUser + '/').then(response => {
      updateData(response.data)
    }).catch(e => console.log(e.response))*/
  },[])
    
    return (
            <Layout>
              <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1" icon={<UserOutlined />}>
                    nav 1
            </Menu.Item>
                  <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    nav 2
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
                  <UserDescription userInfo={userData} updateUserData={updateInfo}/>
                  <FirendList userInfo={userData}/>
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

export default connect(null,mapDispatchToProps)(SiderDemo)