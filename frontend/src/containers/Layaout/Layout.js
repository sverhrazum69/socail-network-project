/*eslint-disable*/
import React, {useState,useEffect} from 'react';
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
import FriendRequests from '../../components/FriendRequests/FriendRequests';


const { Header, Sider, Content } = Layout;




const SiderDemo = props => {

  const displayUser = props.match.params.username
  
  const [collapsed,setState] = useState(false)
  const [userData,updateData] = useState({})
  const [pageContent,updateContent] = useState()
  const updateInfo = () => {
    const getData = async() => {
      const response = await axios.get('http://localhost:8000/api/users/' + displayUser + '/')
      updateContent(
        <>
        <UserDescription userInfo={response.data} updateUserData={updateInfo}/>
        <FirendList userInfo={response.data}/>)
        </>
      )
      updateData(response.data)
      return response.data
    }
    getData().then(() => {
      console.log("success")
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
  },[])



    
    return (
            <Layout>
              <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1" icon={<UserOutlined />} onClick={() => updateContent(
                  <>
                  <UserDescription userInfo={userData} updateUserData={updateInfo}/>
                  <FirendList userInfo={userData}/>)
                  </>
                  )}>
                    User profile
                  </Menu.Item>
                  <Menu.Item key="2" icon={<VideoCameraOutlined />} onClick={() => updateContent(
                    <>
                    <FriendRequests/>
                    </>
                  )}>
                    Friend requests
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

                  {pageContent}
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