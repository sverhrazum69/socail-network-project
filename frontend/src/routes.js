import React from "react";
import { Route } from "react-router-dom";
import SiderDemo from "./containers/Layaout/Layout";
import Login from "./containers/login/login";

const URLRouter = () => (
    <div>
        <Route exact path="/" component={SiderDemo}/>{" "}
        <Route exact path="/login/" component={Login}/>{" "}
    </div>
)

export default URLRouter