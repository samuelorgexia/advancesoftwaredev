import React, { useState, useEffect } from "react";

import propertyData from "../Properties/PropertyData.json"

export default function propertyManagement(props){
   // const { property, ...rest} = props;

    return  (
        <div>
            <form>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2" for="address">
                        Address
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" /*value={property.address}*//>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2" for="postcode">
                        Postcode
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="postcode" type="text" placeholder="Postcode"/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2" for="listing-name">
                        Listing Name
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="listing-name" type="text" placeholder="Listing name"/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2" for="property-type">
                        Property Type
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="property-type" type="text" placeholder="Property type"/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2" for="description">
                        Description
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Description"/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2" for="auction-date">
                        Auction Date
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="auction-date" type="text" placeholder="Auction date"/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2" for="starting-price">
                        Starting Price
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="starting-price" type="text" placeholder="Starting price"/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2" for="auctioneer">
                        Auctioneer
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="auctioneer" type="text" placeholder="Auctioneer"/>
                </div>
                <div>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6" type="button">
                        Update Property
                    </button>
                </div>
            </form>
        </div>
    );
}
