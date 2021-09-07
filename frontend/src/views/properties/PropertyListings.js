import React, { useState, useEffect } from "react";

import Properties from "../../components/Properties/Properties.js";
import Slideover from "../../components/Slideover/Slideover.js";
import Property from "./Property.js";

export default function PropertyListings(props) {
  const { setOverrideTitle, match } = props;

  useEffect(() => {
    if (["all", "past", "upcoming", "live"].includes(match.params.mode)) {
      setOverrideTitle(`${match.params.mode} properties`);
    }

    return () => {
      //reset override title
      setOverrideTitle(null);
    };
  }, [match.params.mode]);

  const [propertyPreview, setPropertyPreview] = useState(false);

  const handlePropertyPreview = (propertyData) => {
    setPropertyPreview(true);
  };

  const properties = [
    {
      id: 1,
      title: "$1,500,000 starting price!",
      address: "304 Bowden street",
      suburb: "Meadowbank",
      state: "NSW",
      postcode: "2114",
      description:
        "Get this once in a lifetime opportunity house today! You're missing out fam! cmon right now before it's too late :'(",
      features: {
        bed: 2,
        bath: 1,
        car: 1,
      },
    },
  ];

  return (
    <>
      <Properties
        onPropertyPreview={handlePropertyPreview}
        properties={properties}
      />
      <Slideover
        open={propertyPreview}
        setOpen={setPropertyPreview}
        title="Property Preview"
      >
        <Property {...props} preview={true} />
      </Slideover>
    </>
  );
}
