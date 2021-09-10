import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import login from "./views/users/login";
import signup from "./views/users/signup";
import userManagement from "./views/users/user-management";

import Property from "./views/Properties/Property";
import PropertyListings from "./views/Properties/PropertyListings";

import addProperty from "./views/admin/addProperty";
import userAdmin from "./views/admin/userAdmin";

const routes = [
  {
    title: "Login",
    pathname: "/login",
    component: login,
    layout: "dashboardLayout", //auth
    /*
    I change to dashboard layout as tempoary as this is not going to be functional for assignment 1
    */
  },
  {
    title: "User Settings",
    pathname: "/user-manage",
    component: userManagement,
    layout: "dashboardLayout",
  },
  {
    title: "Properties",
    pathname: "/properties/:mode",
    component: PropertyListings,
    layout: "dashboardLayout",
  },
  {
    title: "Signup",
    pathname: "/signup",
    component: signup,
    layout: "dashboardLayout",
  },
  {
    title: "View Property",
    pathname: "/property/:id",
    component: Property,
    layout: "dashboardLayout",
  },
  {
    title: "Add property",
    pathname: "/add-property",
    component: addProperty,
    layout: "dashboardLayout",
  },
  {
    title: "User Admin",
    pathname: "user-admin",
    component: userAdmin,
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
