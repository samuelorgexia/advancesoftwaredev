import React, { useState, useEffect } from "react";

import { ReactComponent as BedIcon } from "../../assets/icons/bed.svg";
import { ReactComponent as BathIcon } from "../../assets/icons/bath.svg";
import { ReactComponent as CarIcon } from "../../assets/icons/car.svg";

import Button from "../Buttons/Button.js";
import { Link } from "react-router-dom";

export default function PropertyCard(props) {
  const { onPropertyPreview, property, currentTime } = props;

  const [timeFormat, setTimeFormat] = useState("");

  const handlePropertyPreview = () => {
    onPropertyPreview(property);
  };

  const goToAuction = () => {
    //history.push("/auction")
    window.alert(`propertyId - ${property.id}`);
  };

  useEffect(() => {
    const diff = property.auctionTime - currentTime;

    const text =
      property.auctionTime < currentTime
        ? "Pending Auction – " +
          new Date(property.auctionTime).toLocaleDateString() +
          " " +
          new Date(property.auctionTime).toLocaleTimeString()
        : diff < 1000 * 60
        ? "Less than a minute"
        : diff < 1000 * 60 * 60
        ? Math.floor(diff / (1000 * 60)) + " mintue(s) to auction"
        : diff < 1000 * 60 * 60 * 24
        ? Math.floor(diff / (1000 * 60 * 60)) + " hour(s) to auction"
        : new Date(property.auctionTime).toLocaleDateString() +
          " " +
          new Date(property.auctionTime).toLocaleTimeString();

    if (text !== timeFormat) {
      setTimeFormat(text);
    }
  }, [currentTime]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-md">
      <div>
        <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg" />
      </div>
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
          {property.auctionLive ? (
            <Button colour="red" onClick={goToAuction}>
              View Auction
            </Button>
          ) : property.auctionCompleted ? (
            <Button colour="gray" onClick={goToAuction}>
              View Past Auction
            </Button>
          ) : (
            <Button colour="blue" onClick={handlePropertyPreview}>
              View Property
            </Button>
          )}
        </div>
        {property.auctionLive ? (
          <div
            onClick={handlePropertyPreview}
            className="cursor-pointer text-center text-xs no-underline hover:underline mx-auto"
          >
            View property
          </div>
        ) : property.auctionCompleted ? (
          <div className="text-center text-xs">
            Auction held –{" "}
            {new Date(property.auctionCompleted.date).toLocaleDateString()}
          </div>
        ) : (
          <div className="text-center text-xs">{timeFormat}</div>
        )}
      </div>
    </div>
  );
}
