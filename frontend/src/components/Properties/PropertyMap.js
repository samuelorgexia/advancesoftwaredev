import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

import Marker from "../Map/Marker";

export default function PropertyMap(props) {
  const { centre, properties, currentTime, onPropertyPreview, history } = props;

  const defaultMap = {
    zoom: 14,
  };

  return (
    <div className="w-100" style={{ height: "calc(100vh - 150px)" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAQJ9lnux3vPhD5quGXggyn1Z_YbpD4W9Q" }}
        defaultCenter={
          centre || {
            lat: -33.8188484,
            lng: 151.0619369,
          }
        }
        defaultZoom={defaultMap.zoom}
      >
        {properties
          ? properties.map((property) => {
              const diff = property.auctionTime - currentTime;

              const textObj = {
                live: "Live",
                past: new Date(property.auctionTime).toLocaleDateString(
                  undefined,
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  }
                ),
                upcoming:
                  property.auctionTime < currentTime
                    ? "Pending"
                    : diff < 1000 * 60
                    ? "<1 min"
                    : diff < 1000 * 60 * 60
                    ? Math.floor(diff / (1000 * 60)) + " mins"
                    : diff < 1000 * 60 * 60 * 24
                    ? Math.floor(diff / (1000 * 60 * 60)) + " hours"
                    : new Date(property.auctionTime).toLocaleDateString(
                        undefined,
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        }
                      ),
              };

              const type = property.auctionLive
                ? "live"
                : property.auctionCompleted
                ? "past"
                : "upcoming";

              const text = textObj[type];

              return (
                <Marker
                  type={type}
                  lat={property.coords.lat}
                  lng={property.coords.long}
                  text={text}
                  onClick={() =>
                    type === "upcoming"
                      ? onPropertyPreview(property)
                      : history.push(`/auction/${property.id}`)
                  }
                />
              );
            })
          : null}
      </GoogleMapReact>
    </div>
  );
}
