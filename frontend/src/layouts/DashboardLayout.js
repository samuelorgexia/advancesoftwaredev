import React, { useState, useEffect, Fragment } from "react";

import { Route, Redirect } from "react-router-dom";

import DashboardNav from "../components/NavBars/DashboardNav.js";

import routes from "../routes.js";
import axios from "axios";
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};



const navigation = [
  { name: "All Properties", path: "/properties/all" },
  { name: "Live Auctions", path: "/properties/live" },
  { name: "Upcoming Auctions", path: "/properties/upcoming" },
  { name: "Past Auctions", path: "/properties/past" },
  {name: "SignUp",path:"/signup"},
];


const userNavigation = [
  {name:"Login",href:"/login"}
];

export default function DashboardLayout(props) {
  const [overrideTitle, setOverrideTitle] = useState(null);
  const [login,setLogin]=useState(false);

  function logout(){
    console.log("works");
      localStorage.clear();
      localStorage.removeItem("jwttoken")
      window.location.href='/properties/all';
    }

  const getUser=()=>{
    axios({
      method:'post',
      url:'http://localhost:5000/user/verify',
      headers:{
      jwt:localStorage.getItem('jwttoken'),
      }
    }).then((response)=>{
      console.log(response);
      if(response.data=true){
        // remove sign up link
        navigation.splice(4,1);
        // add user management settings 
      userNavigation.push(  { name: "Settings", href: "/user-manage" });
      userNavigation.push(  {name:"Add Listing",href:"/add-property"});
      userNavigation.push({ name: "Sign out", href:"#",onClick:()=>{ window.location.href='/properties/all'; } });
      userNavigation.splice(0,1);
      }
      
    })
    .catch(function(error){
      console.log(error);
      localStorage.clear();
    });
  }
  const getRoutes = (routes) => {
    return routes.map((route, index) => {
      if (route.layout === "dashboardLayout") {
        return (
          <Route
            exact
            path={route.pathname}
            render={(rest) => {
              return (
                <route.component
                  {...rest}
                  {...props}
                  setOverrideTitle={setOverrideTitle}
                />
              );
            }}
            key={index}
          />
        );
      }
    });
  };

  const getActiveRoute = (routes) => {
    console.log(routes);
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].pathname === props.match.path) {
        return routes[i];
      }
    }

    return null;
  };

  const getActiveRouteTitle = (routes) => {
    const route = getActiveRoute(routes);

    return route ? route.title || "Default Title" : "Default Title";
  };
  useEffect(()=>{
    getUser();
  },[]);

  return (
    <div>
      <DashboardNav
        {...props}
        user={user}
        navigation={navigation}
        userNavigation={userNavigation}
      />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {overrideTitle || getActiveRouteTitle(routes)}
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {getRoutes(routes)}
        </div>
      </main>
    </div>
  );
}
