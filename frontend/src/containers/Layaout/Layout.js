import React, { useState, useEffect } from 'react';
import './Layaout.css';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import * as actions from '../../store/actions/auth'


const { Header, Sider, Content } = Layout;

const SiderDemo = props => {



  const [collapsed, setState] = useState(false)

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

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />} onClick={() => {
            props.history.push("../../" + localStorage.username + "/profile/")
          }}>
            User profile
                  </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />} onClick={() => {
            props.history.push("../../" + localStorage.username + "/friendRequests/")
          }}>
            Friend requestss
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />} onClick={() => {
            props.history.push("../../chat")
          }}>
            Chat rooms
          </Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />} onClick={handleLogout}>
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
          <div className="children-wrapper">
            {props.children}
          </div>
          
          
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