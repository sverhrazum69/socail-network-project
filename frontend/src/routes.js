import React from "react";
import { Route, Router } from "react-router-dom";
import SiderDemo from "./containers/Layaout/Layout";
import Login from "./containers/login/login";
import SignUpForm from "./containers/SignUp/SignUp";

const URLRouter = () => (
    <div>
        <Route exact path="/" component={SiderDemo}/>{" "}
        <Route exact path="/login/" component={Login}/>{" "}
        <Route exact path="/signUp/" component={SignUpForm}/>{" "}
    </div>
)

export default URLRouter