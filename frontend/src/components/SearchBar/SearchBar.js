import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { usePlacesWidget } from "react-google-autocomplete";

export default function SearchBar(props) {
  const { onSearch } = props;

  const [formattedAddress, setFormattedAddress] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handlePlaceSelected = (place) => {
    if (place.geometry) {
      const coords = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      setFormattedAddress(place.formatted_address);

      if (onSearch) onSearch({ coords });
    }
  };

  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey: "AIzaSyAQJ9lnux3vPhD5quGXggyn1Z_YbpD4W9Q", // should probably place this somewhere safer
    onPlaceSelected: handlePlaceSelected,
    options: {
      types: [],
      fields: ["geometry", "formatted_address"],
      componentRestrictions: {
        country: "AU",
      },
    },
  });

  return (
    <div class="p-8">
      <div class="bg-white flex items-center rounded-full shadow-xl">
        <input
          class="roundde-l-full w-full py-3 px-6 m-5 text-gray-700 leading-tight focus:outline-none"
          id="search"
          type="text"
          //defaultValue={"Meadowbank NSW, Australia"}
          placeholder="Search for Property"
          ref={ref}
        />
        <div class="p-4">
          <button class="bg-red-500 text-white rounded-full p-2 hover:bg-red-400 focus:outline-none w-12 h-12 flex items-center justify-center">
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
