import React from 'react';
import { SearchIcon } from "@heroicons/react/outline";

export default function SearchBar() {
    return (
        <div class="p-8">
            <div class="bg-white flex items-center rounded-full shadow-xl">
                <input class="roundde-l-full w-full py-3 px-6 m-5 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search for Property" />
                <div class="p-4">
                    <button class="bg-red-500 text-white rounded-full p-2 hover:bg-red-400 focus:outline-none w-12 h-12 flex items-center justify-center">
                        <SearchIcon/>
                    </button>
                </div>
            </div>
        </div>
    )
}
