import React,{useState} from "react";
import axios from "axios";

function DetailsPopup(props){
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");

    const updateDetails=()=>{
      axios({
        method:'put',
        url:'http://localhost:5000/user/update-user',
        headers:{
          jwt:localStorage.getItem('jwttoken'),
        },
        data:{
          firstName:firstName,
          lastName:lastName,
          email:email
        }
      }).then(function(reponse){
        console.log(reponse);
         props.setTrigger(false);
      });
     
    }

    return (props.trigger)?(
        <div>
            <div class="w-full max-w-xs">
  <form class="">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Name
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Last Name
      </label>
      <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
      
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Email
      </label>
      <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="" value={email} onChange={(e)=>setEmail(e.target.value)} />
      
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={updateDetails}>
        Update Details
      </button>
    <button onClick={() =>props.setTrigger(false)}>Cancel</button>
    </div>
  </form>


</div>

        </div>
    ): "";
}
export default DetailsPopup;