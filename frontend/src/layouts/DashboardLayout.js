import React, { useState, useEffect, Fragment } from "react";

import { Route } from "react-router-dom";

import DashboardNav from "../components/NavBars/DashboardNav.js";

import routes from "../routes.js";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export default function DashboardLayout(props) {
  const getRoutes = (routes) => {
    return routes.map((route, index) => {
      if (route.layout === "dashboardLayout") {
        return (
          <Route
            exact
            path={route.pathname}
            render={(rest) => {
              return <route.component {...rest} {...props} />;
            }}
            key={index}
          />
        );
      }
    });
  };

  const getActiveRouteTitle = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].pathname === window.location.pathname) {
        return routes[i].title;
      }
    }

    return "Default Title";
  };

  return (
    <div>
      <DashboardNav
        user={user}
        navigation={navigation}
        userNavigation={userNavigation}
      />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {getActiveRouteTitle(routes)}
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
