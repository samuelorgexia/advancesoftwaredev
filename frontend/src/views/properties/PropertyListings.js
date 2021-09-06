import React, { useState, useEffect } from "react";

import Properties from "../../components/Properties/Properties.js";
import Slideover from "../../components/Slideover/Slideover.js";
import Property from "./Property.js";

export default function PropertyListings(props) {
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
