import React, { useState, useEffect } from "react";
import axios from "axios";

function UserProfilePopup(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [budget, setBudget] = useState("");
    const getUser = () => {
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
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(user.email);
        setBudget(user.budget);
      });
    };
  

    useEffect(() => {
        getUser();
    });
  
    return props.trigger ? (
      <div>
    <h1>Profile</h1>
        <div class="w-full max-w-xs">
           
          <form class="">
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Name
              </label>
              <p
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
              > {firstName} </p>
              
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Last Name
              </label>
              <p
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
              > {lastName} </p>
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Email
              </label>
              <p
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
              > {email} </p>
              
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Current Budget
              </label>
              <p
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
              >$ {budget} </p>
              
            </div>
            <div class="flex items-center justify-between">
        
              <button onClick={() => props.setTrigger(false)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    ) : (
      ""
    );
  }
  export default UserProfilePopup;