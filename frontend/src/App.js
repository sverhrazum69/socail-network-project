import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css'
import { connect } from 'react-redux';
import SiderDemo from './containers/Layaout/Layout';
//import UserDescription from './components/UserDescription/UserDescription';
//import FirendList from './containers/FriendList/FriendList';


import * as actions from './store/actions/auth'
import URLRouter from './routes';
import { BrowserRouter as Router } from 'react-router-dom';


class App extends Component {

  componentDidMount() {
    this.props.AutoSignup();
  }
  render() {
    return (

      <div className='app-wrapper'>
        <Router>
          <SiderDemo {...this.props}>
            <URLRouter />
          </SiderDemo>
        </Router>

      </div>


    );
  }

}



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

export default connect(mapStateToProps, mapDispatchToProps)(App);
