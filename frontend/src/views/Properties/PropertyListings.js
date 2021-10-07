import React, { useState, useEffect } from "react";

//import propertyData from "./PropertyData.json";

import Properties from "../../components/Properties/Properties.js";
import Slideover from "../../components/Slideover/Slideover.js";
import Property from "./Property.js";

import PropertyMap from "../../components/Properties/PropertyMap.js";

import Button from "../../components/Buttons/Button";

import { MapIcon, ViewListIcon } from "@heroicons/react/solid";

export default function PropertyListings(props) {
  const { match, mapView } = props;

  const coords = {
    lat: -33.8188484,
    lng: 151.0619369,
  };

  const [propertyData, setPropertyData] = useState(null);

  const [propertyPreview, setPropertyPreview] = useState(false);
  const [currentPreview, setCurrentPreview] = useState(null);

  const [currentTime, setCurrentTime] = useState(Date.now());
  const [mode, setMode] = useState(null);

  useEffect(() => {
    if (coords) {
      fetch("/api/properties/list-properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coords: {
            long: coords.lng,
            lat: coords.lat,
          },
        }),
      })
        .then((response) => response.json())
        .then((result) => setPropertyData(result))
        .catch((err) => {
          console.error("Something went wrong");
          console.error(err);
          window.alert("Something went wrong – " + err.message);
        });
    }
  }, [coords.lat, coords.lng]);

  useEffect(() => {
    if (["all", "past", "upcoming", "live"].includes(match.params.mode)) {
      const newMode = match.params.mode;

      setMode(newMode);
    }
  }, [match.params.mode]);

  const handlePropertyPreview = (property) => {
    setCurrentPreview(property);
    setPropertyPreview(true);
  };

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime((t) => t + 1000), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const properties = propertyData
    ? propertyData.filter((property) => {
        if (mode === "past") {
          return !!property.auctionCompleted;
        } else if (mode === "upcoming") {
          return !property.auctionLive && !property.auctionCompleted;
        } else if (mode === "live") {
          return property.auctionLive;
        }

        return true;
      })
    : null;

  if (!properties) {
    return <h1>Loading...</h1>;
  }

  if (properties.length === 0) {
    return <div>No results</div>;
  }

  return (
    <>
      {mapView ? (
        <PropertyMap
          onPropertyPreview={handlePropertyPreview}
          properties={properties}
          currentTime={currentTime}
          centre={coords}
        />
      ) : (
        <Properties
          onPropertyPreview={handlePropertyPreview}
          properties={properties}
          currentTime={currentTime}
          mapView={props.mapView}
        />
      )}

      <Slideover
        open={propertyPreview}
        setOpen={setPropertyPreview}
        title="Property Preview"
      >
        <Property {...props} preview={true} propertyPreview={currentPreview} />
      </Slideover>
    </>
  );
}
