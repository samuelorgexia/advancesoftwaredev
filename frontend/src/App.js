import logo from './logo.svg';
import './App.css';
import {  } from "@headlessui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import routes from './routes';
function App() {
  return (
    <div className="">
     <div className="">
       <Router>
         <ul>
           <li><a><Link to="login">Login</Link></a></li>
           <li><a><Link to="/user-manage">Manage</Link></a></li>
         </ul>
         <routes/>
       </Router>
     </div>
    </div>
  );
}

export default App;
