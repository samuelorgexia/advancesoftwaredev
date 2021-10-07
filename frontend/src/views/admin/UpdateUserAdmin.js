import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios"

export default function UpdateUserAdmin(props) {
    const { ...user } = props;
    
    
    const [user_id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");

    const putUser = () => {
        const user_id = props.match.params.id;
        axios({
          method: "put",
          url: "/user/update-user/" + user_id,
          data: {
            firstName: firstName,
            lastName: lastName,
            role: role,
          },
        })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };

    return (
        <div>
            <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} ></input>
            <input value={lastName} onChange={(e)=>setLastName(e.target.value)}></input>
            <input value={role} onChange={(e)=>setRole(e.target.value)}></input>
            <button onClick={putUser}>button</button>
        </div>
    )
}