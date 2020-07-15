import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css'
import { connect } from 'react-redux';
import Login from "./containers/login/login";
import SignUpForm from "./containers/SignUp/SignUp";

import * as actions from './store/actions/auth'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FriendRequests from './components/FriendRequests/FriendRequests';
import Profile from './components/Profile/Profile';
import Chat from './components/Chat/Chat';


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
        <Route exact path="/:username/profile" component={Profile} />
        <Route exact path="/:username/friendRequests" component={FriendRequests} />
        <Route exact path="/chat/"  component={Chat}/>
        {/* </SiderDemo> */}

      </Router>
    );
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(App);
