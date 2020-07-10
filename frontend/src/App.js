import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css'
import { connect } from 'react-redux';
import SiderDemo from './containers/Layaout/Layout';
import Login from "./containers/login/login";
import SignUpForm from "./containers/SignUp/SignUp";

import * as actions from './store/actions/auth'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';


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

      <Router>
        {console.log(this.props)}
        <Route exact path="/login/" component={Login} />
        <Route exact path="/signUp/" component={SignUpForm} />
        <Route exact path="/" render={
          () => (
              this.props.isAuthenticated ? <SiderDemo /> : <Login />
          )
             
          
        } />

        {/*<SiderDemo {...this.props}>*/}

        {/*</SiderDemo> <URLRouter props = {this.props}/>*/}



      </Router>


    );
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(App);
