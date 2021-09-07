import React, { useState, useEffect } from "react";

import { ReactComponent as BedIcon } from "../../assets/icons/bed.svg";
import { ReactComponent as BathIcon } from "../../assets/icons/bath.svg";
import { ReactComponent as CarIcon } from "../../assets/icons/car.svg";

import Button from "../Buttons/Button.js";

export default function PropertyCard(props) {
  const { onPropertyPreview, property } = props;

  const handlePropertyPreview = () => {
    onPropertyPreview(true);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-md">
      <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg" />
      <div className="px-6 py-4 prose">
        <h3>{property.title}</h3>
        <p>
          {property.address},<br />
          {property.suburb} {property.state} {property.postcode}
        </p>
        <p className="mt-1">{property.description}</p>
        <div className="flex flex-row items-center">
          <div className="pr-1 py-0">{property.features.bed}</div>
          <BedIcon />
          <div className="pl-4 pr-1">{property.features.bath}</div>
          <BathIcon />
          <div className="pl-4 pr-1">{property.features.car}</div>
          <CarIcon />
        </div>
        <div className="py-4">
          <Button colour="red" onClick={handlePropertyPreview}>
            View Property
          </Button>
        </div>
        <div className="text-center text-xs">Countdown to auction</div>
      </div>
    </div>
  );
}
