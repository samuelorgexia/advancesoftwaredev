import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout.js";
import AuthLayout from "./layouts/AuthLayout.js";
import routes from "./routes";
import { useEffect, useState } from "react";

import axios from "axios";

// import io from 'socket.io-client'
// const socket = io.connect("http://localhost:3001");

function App(props) {
  /*const getRoutes = () => {
    return routes.map((route) => {
      if(route.layout === "dashboardLayout"){
        <Route exact path={route.pathname} render={(props) => {
          <DashboardLayout {...props} {...}
        }
        }
      }
    });
  };*/

  const [authenticated, setAuthenticated] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const logout = () => {
    console.log("works");
    setAuthenticated(false);
    window.location.href = "/properties/all";
    localStorage.clear();
    localStorage.removeItem("jwttoken");
  };

  const getUser = (token) => {
    axios({
      method: "post",
      url: "/api/user/verify-role",
      headers: {
        jwt: token,
      },
    })
      .then((response) => {
        console.log(response.data.userRole);
        if (response.data.login) {
          setAuthenticated(true);
        }
        if(response.data.userRole=="admin"){
          setAdminAuth(true);
        }
      })
      .catch(function (error) {
        console.log(error);
        localStorage.clear();
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwttoken");
    if (token) getUser(token);
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path={routes
            .filter((route) => route.layout === "dashboardLayout")
            .map((route) => route.pathname)}
          render={(rest) => (
            <DashboardLayout
              {...rest}
              logout={logout}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
              adminAuthorised={adminAuth}
              setAdminAuthorised={setAdminAuth}
            />
          )}
        />
        <Route
          exact
          path={routes
            .filter((route) => route.layout === "authLayout")
            .map((route) => route.pathname)}
          render={(rest) => <AuthLayout {...rest} />}
        />
        <Redirect from="/properties" to="/properties/all" />
        <Redirect from="/" to="/properties/all" />
      </Switch>
    </Router>
  );

  /*return (
    <div className="">
      <div className="">
        <Router>
          <ul>
            <li>
              <a>
                <Link to="login">Login</Link>
              </a>
            </li>
            <li>
              <a>
                <Link to="/user-manage">Manage</Link>
              </a>
              <p>Text Q</p>
            </li>
          </ul>
          <routes />
        </Router>
      </div>
    </div>
  );*/
}

export default App;
