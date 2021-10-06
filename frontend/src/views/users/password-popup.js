import React,{useState,useEffect} from "react";
import { Dialog, Transition } from '@headlessui/react'
import axios from "axios";
function PasswordPopup(props){
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [error,setError]=useState("");
  const changePassword=()=>{
    if(password==confirmPassword){
      axios({
        method:'put',
        url:'http://localhost:5000/user/update-user-password',
        headers:{
          jwt:localStorage.getItem('jwttoken'),
        },
        data:{
          password:password
        }
      }).then(function(reponse){
        console.log(reponse);
         props.setTrigger(false);
      });
     
    }else{
      if(password!=confirmPassword){
      setError("Password does not match");
      
      } 
      
    }
  }

    return (props.trigger)?(
        <div>
            <div class="w-full max-w-xs">
            <form class="">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        New Password
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="New password"/>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Confirm New Password
      </label>
      <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="passwordConfirm" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Password"/>
      <p>{error}</p>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={changePassword}>
        Update Password
      </button>
    <button onClick={() =>props.setTrigger(false)}>Cancel</button>
    </div>
  </form>



</div>
        

        </div>
    ): "";
}
export default PasswordPopup;