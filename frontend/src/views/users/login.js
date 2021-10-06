import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [emailError,setEmailError]=useState("");
  
  function clear(){
    setEmailError("");
    setError("")
  }
  const login =()=>{
    clear();
    axios({
      method:'post',
      url:'http://localhost:5000/user/login',
      data:{
        email:email.toLowerCase(),
        password:password
      }
    }).then(function(response){
      console.log(response.data);
      if(response.data.token){
      window.location.assign('/properties/all');
    localStorage.setItem("jwttoken",response.data.token);
      }
      if(response.data=="Password is incorrect"){
        setError(response.data);
      }
      if(response.data=="Email does not match"){
        setEmailError(response.data);
      }else{
        setError(response.data[1]);
        setEmailError(response.data[0]);
      }

    }).catch(function(error){
        console.log(error);
      
    });

  }
  
    return(
        <div>
            <div>
            <div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
      <p class="text-red-500 text-xs italic">{emailError}</p>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
      <p class="text-red-500 text-xs italic">{error}</p>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={login}>
        Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
    </div>
  </form>
 
</div>
            </div>
           
        </div>
    )
}
export default Login;