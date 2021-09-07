import React from "react";


function BudgetPopup(props){

    return (props.trigger)?(
        <div>
            <div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <p> $800 000 </p>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Adjust Budget
      </label>
      <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" placeholder="0.00"/>
      
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Update Budget
      </button>
    <button onClick={() =>props.setTrigger(false)}>Cancel</button>
    </div>
  </form>


</div>

        </div>
    ): "";
}
export default BudgetPopup;