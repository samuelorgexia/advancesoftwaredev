import React, { useState, useEffect } from "react";

export default function Button(props) {
  return (
    <button
      {...props}
      className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-${
        props.colour || "indigo"
      }-600 hover:bg-${
        props.colour || "indigo"
      }-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${
        props.colour || "indigo"
      }-500`}
    >
      {props.children}
    </button>
  );
}
