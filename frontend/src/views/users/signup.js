import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Redirect } from "react-router";
function Signup(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError,setFirstNameError]=useState("");
  const[lastNameError,setLastNameError]=useState("");
  const { authenticated, setAuthenticated, history } = props;

  function clear(){
    setEmailError("");
    setFirstNameError("");
    setLastNameError("");
    setPasswordError("");
  }
  const register = () => {
    clear();
    axios({
      method: "post",
      url: "/api/user/signup",
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email.toLowerCase(),
        password: password,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.data.token) {
          setAuthenticated(true);

          localStorage.setItem("jwttoken", response.data.token);
          history.push("/properties/all");
        }
        if (response.status == 200) {
          const errorJson=response.data;
          if(Array.isArray(errorJson)){
            for(var i in errorJson){
              var error=errorJson[i];
              if(error.emailError){
                setEmailError(error.emailError);
              }
              if(error.firstNameError){
                setFirstNameError(error.firstNameError);
              }
              if(error.lastNameError){
                setLastNameError(error.lastNameError);
              }
              if(error.passError){
                setPasswordError(error.passError);
              }
            }
          
          }else{
            setEmailError(response.data);
          }
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return authenticated ? (
    <Redirect to="/properties/all" />
  ) : (
    <div>
      <div>
        <form class="w-full max-w-sm">
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                First Name
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
                <p class="text-red-500 text-xs italic">{firstNameError}</p>
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Last Name
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
                <p class="text-red-500 text-xs italic">{lastNameError}</p>
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Email
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <p class="text-red-500 text-xs italic">{emailError}</p>
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-password"
              >
                Password
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
               <p class="text-red-500 text-xs italic">{passwordError}</p>
            </div>
          
          </div>

          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              <button
                onClick={register}
                class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
