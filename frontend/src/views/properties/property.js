import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Buttons/Button.js";

export default function Property(props) {
  // gets the preview variable from props
  const { preview } = props;

  if (preview) {
    return <div>show in preview</div>;
  }

  //shows when not preview
  return (
    <div className="prose">
      <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg" />

      <div class="w-full">
        <h3 class="text-2xl font-medium">
          8/31 CHARLES STREET, FOREST LODGE, NSW, 2037
        </h3>
        <div class="mt-4">
          <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
            <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">
              Auction Location
            </span>
            <span class="flex-1 text-center sm:text-right">
              UTS Building 11
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
              Abraham Lincoln
            </span>
          </div>
          <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
            <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">
              Auctioneer
            </span>
            <span class="flex-1 text-center sm:text-right">
              George Washington
            </span>
          </div>
          <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
            {/**
             * using brackets and a ternary you can add logic directly inside the dom elements
             *
             * [truthy variable] ? [show if true] : [show if false]
             *
             * null is basically show nothing
             *
             */}
            {preview ? (
              <Button colour="red">
                <Link to="/property/testproperty"> View Listing </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
