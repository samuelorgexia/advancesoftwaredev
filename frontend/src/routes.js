import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import login from "./views/users/login";

import userManagement from "./views/users/user-management";

import Property from "./views/Properties/Property.js";
import PropertyListings from "./views/Properties/PropertyListings.js";

const routes = [
  {
    title: "Login",
    pathname: "/login",
    component: login,
    layout: "authLayout",
  },
  {
    title: "User Management",
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
  {
    title: "View Property",
    pathname: "/properties/:id",
    component: Property,
    layout: "dashboardLayout",
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
