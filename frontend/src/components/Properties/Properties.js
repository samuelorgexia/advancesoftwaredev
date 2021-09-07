import React, { useState, useEffect } from "react";

import PropertyCard from "./PropertyCard.js";

export default function Properties(props) {
  const { properties, ...rest } = props;
  return (
    <div>
      {properties.map((property) => (
        <PropertyCard {...rest} property={property} />
      ))}
    </div>
  );
}
