import React, { useState, useEffect } from "react";
import axios from "axios";

function UserProfilePopup(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
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
        
      });
    };
  

    useEffect(() => {
        getUser();
    });
  
    return props.trigger ? (
      <div>
        <div class="w-full max-w-xs">
          <form class="">
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Last Name
              </label>
              <input
                class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="lastname"
                type=""
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Email
              </label>
              <input
                class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p class="text-red-500 text-xs italic">{emailError}</p>
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