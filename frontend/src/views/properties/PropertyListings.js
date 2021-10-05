import React, { useState, useEffect } from "react";

import propertyData from "./PropertyData.json";

import Properties from "../../components/Properties/Properties.js";
import Slideover from "../../components/Slideover/Slideover.js";
import Property from "./Property.js";

import PropertyMap from "../../components/Properties/PropertyMap.js";

import Button from "../../components/Buttons/Button";

import { MapIcon, ViewListIcon } from "@heroicons/react/solid";

const now = Date.now();

export default function PropertyListings(props) {
  const { setOverrideTitle, match, setHeaderFeature, mapView } = props;

  const [propertyPreview, setPropertyPreview] = useState(false);
  const [currentPreviewId, setCurrentPreviewId] = useState(null);

  const [currentTime, setCurrentTime] = useState(Date.now());
  const [mode, setMode] = useState(null);

  const inMins = (min) => now + 1000 * 60 * min;
  const inHours = (hours) => now + 1000 * 60 * 60 * hours;

  const auctionTimes = [
    inMins(0),
    inMins(1),
    inMins(1),
    inMins(13),
    inMins(56),
    inHours(3),
  ];

  useEffect(() => {
    if (["all", "past", "upcoming", "live"].includes(match.params.mode)) {
      const newMode = match.params.mode;
      setOverrideTitle(
        `${newMode[0].toUpperCase() + newMode.slice(1)} ${
          newMode === "all" ? "properties" : "auctions"
        }`
      );
      setMode(newMode);
    }

    return () => {
      //reset override title
      setOverrideTitle(null);
    };
  }, [match.params.mode]);

  const handlePropertyPreview = (propertyId) => {
    setCurrentPreviewId(propertyId);
    setPropertyPreview(true);
  };

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime((t) => t + 1000), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const properties = Object.values(propertyData)
    .filter((property) => {
      if (mode === "past") {
        return !!property.auctionCompleted;
      } else if (mode === "upcoming") {
        return !property.auctionLive && !property.auctionCompleted;
      } else if (mode === "live") {
        return property.auctionLive;
      }

      return true;
    })
    .map((property, index) => {
      return {
        ...property,
        auctionTime: auctionTimes[index],
      };
    });

  return (
    <>
      {mapView ? (
        <PropertyMap
          onPropertyPreview={handlePropertyPreview}
          properties={properties}
          currentTime={currentTime}
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
        <Property {...props} preview={true} propertyId={currentPreviewId} />
      </Slideover>
    </>
  );
}
