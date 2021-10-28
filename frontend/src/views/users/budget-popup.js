
import React, { useState, useEffect,Fragment } from "react";
import axios from "axios";
import { Dialog, Transition } from '@headlessui/react'
import Success from "./success";
function BudgetPopup(props){
  const [budget,setBudget]=useState("");
  const [money,setMoney]=useState("");
  const [error,setError]=useState("");
  const [successPop,setSuccessPop]=useState(false);

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
            setSuccessPop(true);
            setTimeout(function(){
              <Success update="Details"/>
            props.setTrigger(false);
            },3000);
  
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



<Transition.Root show={successPop} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto"  onClose={setSuccessPop}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
               
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    
                    <div className="mt-2">
                      <Success trigger={successPop}setTrigger={setSuccessPop}></Success>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

        </div>
    ): "";
}
export default BudgetPopup;