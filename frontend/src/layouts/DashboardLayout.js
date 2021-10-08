import React, { useState, useEffect, Fragment } from "react";

import { Route, Redirect, useHistory } from "react-router-dom";

import DashboardNav from "../components/NavBars/DashboardNav.js";

import Button from "../components/Buttons/Button";

import { MapIcon, ViewListIcon } from "@heroicons/react/solid";

import routes from "../routes.js";

import Marker from "../components/Map/Marker.js";

export default function DashboardLayout(props) {
  const { authenticated, logout, setAuthenticated } = props;

  const [mapView, setMapView] = useState(false);

  const [coords, setCoords] = useState(null);
  const [handlingSearch, setHandlingSearch] = useState(false);

  const handleSearch = (object) => {
    setHandlingSearch(true);
    setCoords(object.coords);
  };

  useEffect(() => {
    if (handlingSearch) {
      setMapView(false);
      setHandlingSearch(false);
    }
  }, [handlingSearch]);

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
  ];

  const userNavigation = [
    { name: "Settings", href: "/user-manage" },
    { name: "Add Listing", href: "/add-property" },
    {
      name: "Sign out",
      href: "#",
      onClick: logout,
    },
  ];

  //meadowbank
  const defaultCoords = {
    lat: -33.8157836,
    lng: 151.0896983,
  };

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
                  mapView={mapView}
                  setMapView={setMapView}
                  authenticated={authenticated}
                  setAuthenticated={setAuthenticated}
                  coords={coords || defaultCoords}
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
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].pathname === props.match.path) {
        return routes[i];
      }
    }

    return null;
  };

  const getActiveRouteTitle = (routes) => {
    const route = getActiveRoute(routes);

    if (route && route.titleKey && typeof route.title === "object") {
      return route.title[props.match.params[route.titleKey]];
    }

    return route ? route.title || "Default Title" : "Default Title";
  };

  return (
    <div>
      <DashboardNav
        {...props}
        user={user}
        navigation={
          authenticated
            ? navigation
            : [...navigation, { name: "Sign Up", path: "/signup" }]
        }
        userNavigation={userNavigation}
        authenticated={authenticated}
        onSearch={handleSearch}
      />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-stretch">
            <h1 className="text-3xl font-bold text-gray-900">
              {getActiveRouteTitle(routes)}
            </h1>
            {props.match.path.indexOf("properties") !== -1 ? (
              <div>
                {mapView ? (
                  <Button colour="gray" onClick={() => setMapView(false)}>
                    <ViewListIcon className="w-5 mx-auto" />
                    <span className="pl-2 text-s my-auto">List only</span>
                  </Button>
                ) : (
                  <Button colour="blue" onClick={() => setMapView(true)}>
                    <MapIcon className="w-5 mx-auto" />
                    <span className="pl-2 text-s my-auto">View Map</span>
                  </Button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </header>
      <main>
        <div
          className={
            mapView ? "w-full" : "max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"
          }
        >
          {getRoutes(routes)}
        </div>
      </main>
    </div>
  );
}
