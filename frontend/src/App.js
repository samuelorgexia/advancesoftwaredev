import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout.js";
import AuthLayout from "./layouts/AuthLayout.js";

import routes from "./routes";

function App() {
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

  return (
    <Router>
      <Switch>
        <Route
          exact
          path={routes
            .filter((route) => route.layout === "dashboardLayout")
            .map((route) => route.pathname)}
          render={(rest) => <DashboardLayout {...rest} />}
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
