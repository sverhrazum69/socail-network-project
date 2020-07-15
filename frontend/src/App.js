import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css'
import { connect } from 'react-redux';
import SiderDemo from './containers/Layaout/Layout';
import Login from "./containers/login/login";
import SignUpForm from "./containers/SignUp/SignUp";

import * as actions from './store/actions/auth'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserDescription from './components/UserDescription/UserDescription';
import FriendRequests from './components/FriendRequests/FriendRequests';
import Layout from './containers/Layaout/Layout';
import Profile from './components/Profile/Profile';


const mapStateToProps = state => {
  return {
    isAuthenticated: state.token != null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    AutoSignup: () => dispatch(actions.authCheckState())
  }
}


class App extends Component {


  componentDidMount() {
    this.props.AutoSignup();
  }

  render() {
    return (

      <Router {...this.props}>
        {console.log(this.props)}
        <Route exact path="/login/" component={Login} />
        <Route exact path="/signUp/" component={SignUpForm} />
        {/* <Route path="/profilePage/:username" component={SiderDemo} /> */}
        {/* <SiderDemo {...this.props}> */}
          <Route exact path="/profilePage/:username/profile" component={Profile} />
          <Route exact path="/profilePage/:username/friendRequests" component={FriendRequests} />
       
        {/* </SiderDemo> */}

      </Router>
    );
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(App);
