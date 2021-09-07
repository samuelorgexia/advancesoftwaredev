import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import login from "./views/users/login";
import signup  from "./views/users/signup";
import userManagement from "./views/users/user-management";
import property from "./views/properties/property";
import PropertyListings from "./views/properties/PropertyListings.js";

const routes = [
  {
    title: "Login",
    pathname: "/login",
    component: login,
    layout: "dashboardLayout", //auth
  },
  {
    title: "User Settings",
    pathname: "/user-manage",
    component: userManagement,
    layout: "dashboardLayout",
  },
  {
    title: "Properties",
    pathname: "/properties",
    component: PropertyListings,
    layout: "dashboardLayout",
  },
  {title:"Signup",
  pathname:"/signup",
  component:signup,
    layout:"dashboardLayout"
  },
];

/*function routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={login}></Route>
        <Route exact path="/user-manage" component={userManagement}></Route>
      </Switch>
    </div>
  );
}*/

export default routes;
