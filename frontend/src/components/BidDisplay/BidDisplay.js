import React, { useState, useEffect } from "react";
import Button from "../../components/Buttons/Button";
import { io } from "socket.io-client";
const socket = io("localhost:5000");

export default function BidDisplay() {
    const [userBid, setUserBid] = useState(0);
    const [highestBid, setHighestBid] = useState(0);
  
    useEffect(()=> {
      socket.on("bid:read", (currentBid) => {
        setHighestBid(currentBid);
      });
    },[]);
  
    const handleBidSubmit = ()=> {
        socket.emit("bid:create", userBid);
    }

    return (
        <div>
            <h1>Current Bid: <span>${highestBid.toLocaleString()}</span></h1>
            $ <input type="number" min="1" placeholder="Input your bid" onChange={e => setUserBid(e.target.valueAsNumber)}/>
            <Button onClick={handleBidSubmit}>Place Bid</Button>
      </div>
    )
}
