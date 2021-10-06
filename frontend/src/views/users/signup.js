import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
function Signup(){
const [firstName,setFirstName]=useState("");
const [lastName,setLastName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

  const register=()=>{
    axios({
      method:'post',
      url:'http://localhost:5000/user/signup',
      data:{
        firstName:firstName,
        lastName:lastName,
        email:email.toLowerCase(),
        password:password
      }
    }).then((response)=>{
      console.log(response);
      window.location.href='/properties/all';
    localStorage.setItem("jwttoken",response.data.token);
    
    }
    );
  }
    return(
        <div>
            <div>
            <form class="w-full max-w-sm">
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        First Name
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="First Name"/>
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Last Name
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Last Name"/>
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Email
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
        Password
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
    </div>
  </div>

  <div class="md:flex md:items-center">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button onClick={register} class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        Sign Up
      </button>
    </div>
  </div>
</form>
            </div>
            
        </div>
    )
}
export default Signup;