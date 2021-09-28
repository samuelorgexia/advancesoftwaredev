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

            <div class="relative flex items-top justify-center bg-white dark:bg-gray-900 sm:items-center sm:pt-0">
            <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div class="mt-8 overflow-hidden">
                    <div class="grid grid-cols-1 md:grid-cols-2">
                        <div class="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg">
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    First Name
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
                                <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                                </div>
                                <div class="w-full md:w-1/2 px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                    Last Name
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                    E-mail
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email"/>
                                <p class="text-gray-600 text-xs italic">Some tips - as long as needed</p>
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                    Message
                                </label>
                                <textarea class=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="message"></textarea>
                                <p class="text-gray-600 text-xs italic">Re-size can be disabled by set by resize-none / resize-y / resize-x / resize</p>
                                </div>
                            </div>
                            <div class="md:flex md:items-center">
                                <div class="md:w-1/3">
                                <button class="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                    Send
                                </button>
                                </div>
                                <div class="md:w-2/3"></div>
                            </div>
                        </div>
                        <form class="w-full max-w-lg">
                        <form class="p-6 flex flex-col justify-center">
                            <h1>Contact Agent</h1>
                            <div class="flex flex-col">
                                <label for="name" class="hidden">Full Name</label>
                                <input type="name" name="name" id="name" placeholder="Full Name" class="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"/>
                            </div>

                            <div class="flex flex-col mt-2">
                                <label for="email" class="hidden">Email</label>
                                <input type="email" name="email" id="email" placeholder="Email" class="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"/>
                            </div>

                            <div class="flex flex-col mt-2">
                                <label for="tel" class="hidden">Number</label>
                                <input type="tel" name="tel" id="tel" placeholder="Telephone Number" class="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"/>
                            </div>

                            <button type="submit" class="md:w-32 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300">
                                Submit
                            </button>
                        </form>
                    </form>

                    </div>
                </div>
            </div>
        </div>
        </>
      )
}

