
import React, { useState, useEffect } from "react";
import axios from "axios";


function BudgetPopup(props){
  const [budget,setBudget]=useState("");
  const [money,setMoney]=useState("");
  const [error,setError]=useState("");
    const getUser =()=>{
      console.log(localStorage.jwttoken);
      axios({
        method: "post",
        url: "/api/user/get-user",
        withCredentials: true,
        headers: {
          jwt: localStorage.jwttoken,
        },
        responseType: "stream",
      }).then(function (response) {
        const user = response.data[0];
        setBudget(user.budget);
        console.log(response.data[0]);
      });
    }
    const updateBudget =()=>{
      axios({
        method: "put",
        url: "/api/user/update-budget",
        headers: {
          jwt: localStorage.getItem("jwttoken"),
        },
        data: {
          budget:money,
        },
      })
        .then(function (response) {
          console.log(response);
          if(response.data=="updated budget"){
            props.setTrigger(false);
          }else{
            setError(response.data[0])
          }
       
        })
        .catch(function (error) {
          console.log(error);
        });
  
    }
    useEffect(() => {
      getUser();
  });
    return (props.trigger)?(
        <div>
            <div class="w-full max-w-xs">
  <form class="">
    <label class="block text-gray-700 text-sm font-bold mb-2 ">Curent Budget </label>
    <p>$ {budget} </p>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Adjust Budget
      </label>
      <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" value={money} onChange={(e) => setMoney(e.target.value)}/>
      <p class="text-red-500 text-xs italic">{error}</p>
    </div>
    <div class="flex items-center justify-between">
      <button onClick={updateBudget} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
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