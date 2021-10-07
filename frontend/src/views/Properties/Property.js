import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Buttons/Button.js";
import PropertyData from "./PropertyData.json";
import PropertyDetails from "./PropertyDetails";
import { CarouselData } from "../../components/ImageCarousel/CarouselData.js";

export default function Property(props) {
  // gets the preview variable from props
  const { preview, propertyPreview, match } = props;
  const id = propertyPreview
    ? propertyPreview.id || match.params.id
    : match.params.id;

  const [property, setProperty] = useState(propertyPreview || null);

  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setError(true);
    } else if (!propertyPreview || !property) {
      fetch(`/api/properties/get-property/${id}`)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setProperty(result);
        })
        .catch((error) => {
          console.error("Something went wrong");
          console.error(error);
          window.alert("Something went wrong – " + error.message);
          setError(true);
        });
    }
  }, []);

  if (error) {
    return <div>error</div>;
  }

  if (!property) {
    return <div>loading</div>;
  }

  if (preview) {
    return (
      <>
        <h1>{id}</h1>
        <div className="prose">
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg" />

          <div class="w-full">
            <h3 class="text-2xl font-medium">
              <div style={{ fontSize: "0.5em" }}>
                <h1 style={{ margin: 0 }}> {property.address} </h1>
                <h1 style={{ margin: 0 }}>
                  {" "}
                  {property.suburb} {property.postcode}, {property.state}{" "}
                </h1>
              </div>
            </h3>

            <div class="mt-4">
              <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
                <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">
                  Auction Location
                </span>
                <span class="flex-1 text-center sm:text-right">
                  {property.auctionLocation}
                </span>
              </div>
              <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
                <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">
                  Live Auction
                </span>
                <span class="flex-1 text-center sm:text-right">YES</span>
              </div>
              <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
                <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">
                  Register To BID
                </span>
                <span class="flex-1 text-center sm:text-right">NOW</span>
              </div>
              <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
                <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">
                  Auction Date
                </span>
                <span class="flex-1 text-center sm:text-right">
                  October 31st, 5:00PM
                </span>
              </div>
              <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
                <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">
                  Timezone
                </span>
                <span class="flex-1 text-center sm:text-right">
                  Australian Eastern Standard Time
                </span>
              </div>
              <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
                <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">
                  Agent
                </span>
                <span class="flex-1 text-center sm:text-right">
                  {property.agent}
                </span>
              </div>
              <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
                <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">
                  Auctioneer
                </span>
                <span class="flex-1 text-center sm:text-right">
                  {property.auctioneer}
                </span>
              </div>
              <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none"></div>
            </div>
          </div>
        </div>

        <Link to={`/property/${id}`}>
          <Button colour="red">View Listing</Button>
        </Link>
      </>
    );
  }

  //shows when not preview
  return (
    <>
      <PropertyDetails id={id || match.params.id} property={property} />
    </>
  );
}
