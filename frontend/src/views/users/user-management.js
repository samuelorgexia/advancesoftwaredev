import React,{useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import PasswordPopup from './password-popup';
import DetailsPopup from './details-popup';
import BudgetPopup from './budget-popup';
 function Usermanagement(){ 
   const [passpopup,setpassPopup]=useState(false);
   const [dePopup,setdePopup]=useState(false);
   const [budPopup,setbudPopup]=useState(false);
   
    return(
       
        <div >

          <div>
             <ul>
        <li class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"><button  onClick={()=>setpassPopup(true)} >Change Password</button></li>
        <li class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"><button onClick={()=>setdePopup(true)}  >Change Details</button></li>
        <li class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"><button onClick={()=>setbudPopup(true)}  >Set Budget</button></li>
    </ul>
    </div>






    <div>
         <PasswordPopup trigger={passpopup} setTrigger={setpassPopup}>
         </PasswordPopup>
         <DetailsPopup trigger={dePopup} setTrigger={setdePopup}></DetailsPopup>
         <BudgetPopup  trigger={budPopup}setTrigger={setbudPopup}>
         </BudgetPopup>

         </div>



        </div>
    )
}
export default Usermanagement;