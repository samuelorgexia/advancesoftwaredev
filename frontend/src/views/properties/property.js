import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Property(props) {
  return (
    <div className="prose">
      Put property property here lol. You can then link to the full property
      page here <Link to="/properties/testproperty">Like this</Link>
    </div>
  );
}
