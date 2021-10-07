import React from 'react'
import { ReactComponent as BedIcon } from "../../assets/icons/bed.svg";
import { ReactComponent as BathIcon } from "../../assets/icons/bath.svg";
import { ReactComponent as CarIcon } from "../../assets/icons/car.svg";
import { Link } from "react-router-dom";
import Button from "../../components/Buttons/Button.js";
import PropertyData from "./PropertyData.json";

const OtherListings = ( {id} ) => {

    

    return (
    <div class="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <img class="object-cover object-center w-full h-56" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg"/>
        
        <div class="flex items-center px-6 py-3 bg-gray-900">
            <h1 class="mx-3 text-lg font-medium text-white">
                {PropertyData[id].price}
            </h1>
        </div>

        <div class="px-6 py-4">
            <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
                {PropertyData[id].address}, {PropertyData[id].suburb}, {PropertyData[id].state} {PropertyData[id].postcode}
            </h1>
        </div>

        <div class="flex items-center ml-8 text-gray-700 dark:text-gray-200 mb-5">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
                <div className="flex flex-row items-center">
                <div className="pr-1 py-0">{PropertyData[id].features.bed}</div>
                <BedIcon />
                <div className="pl-4 pr-1">{PropertyData[id].features.bath}</div>
                <BathIcon />
                <div className="pl-4 pr-1">{PropertyData[id].features.car}</div>
                <CarIcon />
                </div>
        </div>
        <Link to= {`/property/${id}`}> 
          <Button colour="red">            
            View Listing 
          </Button>
        </Link>
    </div>
    )
}

export default OtherListings
