import React, {Fragment} from 'react'
import Carousel from "../../components/ImageCarousel/Carousel.js";
import { Link } from "react-router-dom";
import Button from "../../components/Buttons/Button.js";
import PropertyData from "./PropertyData.json";
import { ReactComponent as BedIcon } from "../../assets/icons/bed.svg";
import { ReactComponent as BathIcon } from "../../assets/icons/bath.svg";
import { ReactComponent as CarIcon } from "../../assets/icons/car.svg";

export default function PropertyDetails( {id} ) {

    return (
        <>
            <Carousel />
            <br></br>
            <div class="bg-white shadow overflow-hidden sm:rounded-lg my-10">
                <div class="px-4 py-5 sm:px-6 border-b border-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-lg leading-6 font-medium text-gray-900">
                            {PropertyData[id].address}
                        <br></br>
                        <h3 class="mt-1 max-w-2xl text-sm text-black-500">
                            {PropertyData[id].suburb}, {PropertyData[id].state} {PropertyData[id].postcode}
                        </h3>
                        </dt>
                        <dd class="text-sm font-medium text-black-500">
                        <div className="flex flex-row items-center">
                    <div className="pr-1 py-0">{PropertyData[id].features.bed}</div>
                        <BedIcon />
                        <div className="pl-4 pr-1">{PropertyData[id].features.bath}</div>
                        <BathIcon />
                        <div className="pl-4 pr-1">{PropertyData[id].features.car}</div>
                        <CarIcon />
                    </div>
                        </dd>
                    </div>
                <div class="border-gray-200">
                    <dl>
                    <div class="border-b border-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-black-500">
                        Display Location
                        <br></br>
                        <h3 class="text-gray-500">
                            {PropertyData[id].address}, {PropertyData[id].suburb}, {PropertyData[id].state} {PropertyData[id].postcode}
                            </h3>
                        </dt>
                        <dd class="text-sm font-medium text-black-500">
                            Size
                            <h3 class="text-gray-500"> 
                                {PropertyData[id].size} m<sup>2</sup>
                            </h3>
                        </dd>
                    </div>
                    <div class="border-b border-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Price Estimate
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {PropertyData[id].price}
                        </dd>
                    </div>
                    <div class="border-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                        About
                        </dt>
                        <dd class=" mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                        </dd>
                    </div>

                </dl>
            </div>
        </div>        

        <div class="grid grid-cols-2 font-semibold text-3xl my-10">
            <div class ="flex mx-28">Contact Agent</div>
            <div class ="flex justify-center">Schedule Tour</div>
        </div>

        <section class="w-full text-gray-900  bg-center bg-cover bg-no-repeat">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 flex items-center justify-center">
            <div class="lg:w-3/6 xl:w-2/5 md:w-full bg-gray-50 p-8 flex flex-col w-full mt-10 lg:mt-0 rounded-md">
                    <div class="relative mb-4">
                        <label for="full-name" class="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" id="name" name="name" class="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"/>
                    </div>
                    <div class="relative mb-4">
                        <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" id="email" name="email" class="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"/>
                    </div>
                    <div class="relative mb-4">
                        <label for="email" class="leading-7 text-sm text-gray-600">Phone</label>
                        <input type="email" id="phone" name="phone" class="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"/>
                    </div>
                    <div class="relative mb-4">
                        <label for="email" class="leading-7 text-sm text-gray-600">Message</label>
                        <textarea id="message" name="message" rows="4" class="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"> </textarea>
                    </div>
                    <button class="text-white bg-indigo-500 rounded-md border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 text-lg">Submit</button>
                </div>                

                <div class="lg:w-3/6 xl:w-2/5 md:w-full bg-gray-50 p-8 flex flex-col lg:ml-auto w-full mt-10 lg:mt-0 rounded-md">
                    <div class="relative mb-4">
                        <label for="full-name" class="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" id="name" name="name" class="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"/>
                    </div>
                    <div class="relative mb-4">
                        <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" id="email" name="email" class="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"/>
                    </div>
                    <div class="relative mb-4">
                        <label for="email" class="leading-7 text-sm text-gray-600">Phone</label>
                        <input type="email" id="phone" name="phone" class="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"/>
                    </div>
                    <div class="relative mb-4">
                        <label for="email" class="leading-7 text-sm text-gray-600">Message</label>
                        <textarea id="message" name="message" rows="4" class="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"> </textarea>
                    </div>
                    <button class="text-white bg-indigo-500 rounded-md border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 text-lg">Submit</button>
                </div>
            </div>
        </section>
        </>
      )
}

