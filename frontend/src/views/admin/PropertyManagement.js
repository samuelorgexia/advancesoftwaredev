import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios"
import Properties from "../../components/Properties/Properties";

export default function PropertyManagement(props){

    const property_id = props.match.params.id;

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [reserve, setReserve] = useState("");
    const [address, setAddress] = useState("");
    const [suburb, setSuburb] = useState("");
    const [state, setState] = useState("");
    const [postcode, setPostCode] = useState("");
    const [description, setDescription] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [cars, setCars] = useState("");
    const [long, setLong] = useState("");
    const [lat, setLat] = useState("");
    const [size, setSize] = useState("");
    const [agent, setAgent] = useState("");
    const [auctioneer, setAuctioneer] = useState("");
    const [auctionlocation, setAuctionLocation] = useState("");
    const [auctiondate, setAuctionDate] = useState("");
    

    const getProperty =() => {
        fetch("/api/properties/get-property/"+property_id)
        .then((response) => response.json())
        .then((result) => {
            const property = result;
            setTitle(property.title);
            setPrice(property.price);
            setReserve(property.reserve_price);
            setAddress(property.address);
            setSuburb(property.suburb);
            setState(property.state);
            setPostCode(property.postcode);
            setDescription(property.description);
            setBedrooms(property.features_bed);
            setBathrooms(property.features_bath);
            setCars(property.features_car);
            setLong(property.coords_long);
            setLat(property.coords_lat);
            setSize(property.property_size);
            setAgent(property.agent);
            setAuctioneer(property.auctioneer);
            setAuctionLocation(property.auction_location);
            setAuctionDate(property.auction_date_time);
        })
      }

    const updateProperty = () => {
        //yeet
    }

    const deleteProperty = () => {
        //yeet
    }

    useEffect(() => {
        getProperty();
    },[]);

    return  (
        <div>
            <form>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        Title
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        Price
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        Reserve Price
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={reserve} onChange={(e)=>setReserve(e.target.value)}/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        Address
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        Suburb
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={suburb} onChange={(e)=>setSuburb(e.target.value)}/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        State
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={state} onChange={(e)=>setState(e.target.value)}/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        Post Code
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={postcode} onChange={(e)=>setPostCode(e.target.value)}/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        Description
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        Bedrooms
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={bedrooms} onChange={(e)=>setBedrooms(e.target.value)}/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        Bathrooms
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={bathrooms} onChange={(e)=>setBathrooms(e.target.value)}/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        Car Spots
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={cars} onChange={(e)=>setCars(e.target.value)}/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        Longnitude
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={long} onChange={(e)=>setLong(e.target.value)}/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        Latitude
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={lat} onChange={(e)=>setLat(e.target.value)}/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        Property Size
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={size} onChange={(e)=>setSize(e.target.value)}/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        Agent
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={agent} onChange={(e)=>setAgent(e.target.value)}/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        Auctioneer
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={auctioneer} onChange={(e)=>setAuctioneer(e.target.value)}/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        Auction Location
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={auctionlocation} onChange={(e)=>setAuctionLocation(e.target.value)}/>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mt-2">
                        Auction Date
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={auctiondate} onChange={(e)=>setAuctionDate(e.target.value)}/>
                </div>
                <div>
                    <Link class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6" to={'../property-admin'}> 	&lt; </Link>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6" onClick={updateProperty}>Update Property</button>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6" onClick={deleteProperty}>Delete Property</button>
                </div>
            </form>
        </div>
    );
}
