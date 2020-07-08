import React from "react";
import { Route } from "react-router-dom";
import SiderDemo from "./containers/Layaout/Layout";
import login from "./components/login/login";

const URLRouter = () => (
    <div>
        <Route exact path="/" component={SiderDemo}/>{" "}
        <Route exact path="/login/" component={login}/>{" "}
    </div>
)

export default URLRouter