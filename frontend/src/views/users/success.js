import React, { useState, useEffect } from "react";
import axios from "axios";

function Success(props) {
  console.log(props)

  return  (
    <div>
  <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
  <h1 class="font-bold">{props.update} updated!</h1>
  
</div>

    </div>
  )
}
export default Success;