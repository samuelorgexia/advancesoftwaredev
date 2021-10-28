import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PropertyAdmin(props) {

    const [Properties, setProperties] = useState([]);

    const getProperties =() => {
        fetch("/api/properties/get-properties")
        .then((response) => response.json())
        .then((result) => {
            setProperties(result);
        })
    }

    useEffect(() => {
        getProperties();
    },[]);

    return (
        <div class="space-y-4">
            <div class="block">
                <div class="grid gap-5 grid-cols-5 p-1">
                    <div class="flex block text-gray-700 text-sm font-bold mb-2">Address</div>
                    <div class="flex block text-gray-700 text-sm font-bold mb-2"></div>
                </div>
            </div>
            <div class="block">
                {Properties && Properties.map(property =>
                    <div key={property.property_id} class="grid gap-5 grid-cols-5 p-1">
                        <div class="flex items-center">{property.address}</div>
                        <Link class="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline justify-center" to={'property-management/'+property.property_id}>Manage Property</Link>
                    </div>
                )}
            </div> 
        </div>
    )
}