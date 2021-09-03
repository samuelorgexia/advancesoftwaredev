import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import login from "./views/users/login";
import userManagement from "./views/users/user-management";
import property from "./views/properties/property";

function routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={login}></Route>
        <Route exact path="/user-manage" component={userManagement}></Route>
      </Switch>
    </div>
  );
}
export default routes;