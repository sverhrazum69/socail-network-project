import React from 'react';
import './Layaout.css';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Login from '../login/login';
import * as actions from '../../store/actions/auth'
import FirendList from '../../components/FriendList/FriendList';
import UserDescription from '../../components/UserDescription/UserDescription';


const { Header, Sider, Content } = Layout;



class SiderDemo extends React.Component {
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  
  render() {
    return (
            <Layout>
              <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1" icon={<UserOutlined />}>
                    nav 1
            </Menu.Item>
                  <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    nav 2
            </Menu.Item>
                  <Menu.Item key="3" icon={<UploadOutlined />} onClick={this.props.logout}>
                    logout
            </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                  {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
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
                  <UserDescription />
                  <FirendList />
                </Content>
              </Layout>
            </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(actions.logout())
  }
}

export default connect(null,mapDispatchToProps)(SiderDemo)