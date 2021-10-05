import React, { useState, useEffect } from "react";

import {
  ClockIcon,
  LightningBoltIcon,
  CheckIcon,
} from "@heroicons/react/solid";

export default function Marker(props) {
  const { type, text } = props;

  const Marker = (rest) => (
    <button
      {...props}
      {...rest}
      className={`group z-20 relative flex justify-center rounded-full py-1 px-3 border-transparent text-sm font-medium rounded-md text-white bg-${
        rest.colour || "indigo"
      }-600 hover:bg-${rest.colour || "indigo"}-700`}
      style={{
        width: "100px",
        right: "50px",
        height: "28px",
        bottom: "28px",
      }}
    >
      <span className="z-10 flex">{rest.children}</span>
      <div
        className={`transform rotate-45 w-5 h-5 absolute z-0 bg-${
          rest.colour || "indigo"
        }-600 group-hover:bg-${rest.colour || "indigo"}-700`}
        style={{ top: "10px" }}
      />
    </button>
  );

  if (type === "upcoming") {
    return (
      <Marker colour="blue">
        <ClockIcon className="h-4 my-auto pr-1" /> {text}
      </Marker>
    );
  }

  if (type === "live") {
    return (
      <Marker colour="red">
        <LightningBoltIcon className="h-4 my-auto pr-1" /> Live
      </Marker>
    );
  }

  if (type === "past") {
    return (
      <Marker colour="gray">
        <CheckIcon className="h-4 my-auto pr-1" /> {text}
      </Marker>
    );
  }

  return <Marker>{text}</Marker>;
}
