import React from 'react';
import './Layaout.css';
import { Layout, Menu } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Login from '../../components/login/login';

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
      <Router>
        {
          this.props.isAuthenticated
          ? ''
          : <Redirect to="/login">{console.log(this.props)}</Redirect>
        }
        
        <Switch>

          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
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
                  <Menu.Item key="3" icon={<UploadOutlined />}>
                    nav 3
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
                  {this.props.children}
                </Content>
              </Layout>
            </Layout>
          </Route>
        </Switch>
      </Router>

    );
  }
}

export default SiderDemo