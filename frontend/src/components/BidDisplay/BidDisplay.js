import React, { useState, useEffect } from "react";
import Button from "../../components/Buttons/Button";
import { io } from "socket.io-client";
import axios from "axios";
const socket = io("localhost:5000");

export default function BidDisplay() {
    const [userBid, setUserBid] = useState(0);
    const [highestBid, setHighestBid] = useState(0);
    const [statusMessage, setStatusMessage] = useState("");
  
    useEffect(()=> {
      getPropertyById(2);
      readBid();
    },[]);
  
    const handleBidSubmit = ()=> {
        socket.emit("bid:create", { userBid, highestBid });
    }

    const readBid = () => {
      socket.on("bid:read", (currentHighestBid) => {
        const { price, message } = currentHighestBid;
        setStatusMessage(message);
        setHighestBid(price);
      });
    }

    const getPropertyById = (id) => {
      axios.get(`/api/properties/get-property/${id}`)
      .then((response) => response.data)
      .then((data) => {
        const price = data.reservePrice;
        setHighestBid(price);
      });
    }

    return (
        <div>
            <h1>Current Bid: <span>${highestBid.toLocaleString()}</span></h1>
            $ <input type="number" min="1" placeholder="Input your bid" onChange={e => setUserBid(e.target.valueAsNumber)}/>
            <Button onClick={handleBidSubmit}>Place Bid</Button>
            <p>{statusMessage}</p>
      </div>
    )
}
