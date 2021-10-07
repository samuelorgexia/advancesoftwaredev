import React, { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination.js";

import PropertyCard from "./PropertyCard.js";

export default function Properties(props) {
  const { properties, mapView, ...rest } = props;
  return (
    <div>
      <div
        className={
          mapView
            ? "grid justify-center xs:grid-cols-1 gap-4 gap-y-10"
            : "grid justify-center xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-10"
        }
      >
        {properties.map((property, index) => (
          <PropertyCard {...rest} key={index} property={property} />
        ))}
      </div>
      {false ? (
        <div className="text-center mt-16">
          <Pagination />
        </div>
      ) : null}
    </div>
  );
}
