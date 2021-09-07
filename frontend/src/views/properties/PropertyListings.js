import React, { useState, useEffect } from "react";

import Properties from "../../components/Properties/Properties.js";
import Slideover from "../../components/Slideover/Slideover.js";
import Property from "../../views/Properties/Property.js";

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

  return (
    <>
      <Properties onPropertyPreview={handlePropertyPreview} />
      <Slideover
        open={propertyPreview}
        setOpen={setPropertyPreview}
        title="Property Preview"
      >
        <Property {...props} />
      </Slideover>
    </>
  );
}
