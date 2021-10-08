import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios"
import Properties from "../../components/Properties/Properties";

export default function UpdateUserAdmin(props) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");

    const putUser = () => {
        const user_id = props.match.params.id;
        console.log(props);
        axios({
          method: "put",
          url: "/user/update-user/" + user_id,
          data: {
            firstName: firstName,
            lastName: lastName,
            role: role
          },
        })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    };

    const deleteUser = () => {
      const user_id = props.match.params.id;
      axios({
        method: "delete",
        url: "/user/delete-user/" + user_id,
      }).then(function (error) {
        console.log(error);
      });
    };

    useEffect(() => {});

    return (
        <div class="w-full max-w-xs">
          <form>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="first_name"
              >
                Name
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e)=>setFirstName(e.target.value)} ></input>
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="last_name"
              >
                Last Name
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e)=>setLastName(e.target.value)}></input>
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="role"
              >
                Role
              </label>
              <switch>
                <option class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e)=>setRole(e.target.value)}></option>
              </switch>
            </div>
            <div class="flex items-center justify-between">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={putUser}>Update User</button>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={deleteUser}>Delete User</button>
            </div>
          </form>
        </div>
    )
}