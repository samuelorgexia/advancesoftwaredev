import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import {CarouselData} from './CarouselData.js';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/solid';
import PropertyData from "../../views/Properties/PropertyData.json";

const Carousel = ( {id} ) => {

    const [current, setCurrent] = useState(0);
    // const length = CarouselData.length;
    const length = PropertyData[id].image.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length -1 : current -1);
    };

    return (
        <section class = "relative flex justify-center items-center">
            <ChevronLeftIcon class="w-15 h-12 z-10 bg-gray-500 bg-opacity-50 cursor-pointer absolute inset-y-50% left-0" onClick={prevSlide}/>
            <ChevronRightIcon class="w-15 h-12 z-10 bg-gray-500 bg-opacity-50 cursor-pointer absolute inset-y-50% right-0" onClick={nextSlide}/>

            {PropertyData[id].image.map ((slide, index) => {
                return (
                <div  > 
                    {index === current && (
                        <img src = {PropertyData[id].image[index]}/> 
                    )}
                </div>                    
                )
            })}

        </section>
    );
};

export default Carousel
