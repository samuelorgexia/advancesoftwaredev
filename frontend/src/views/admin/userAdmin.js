import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


export default function UserAdmin(props) { 

    const [Users, setUsers] = useState([]);
    
    const getUsers =() => {
        fetch("/user/get-users")
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            setUsers(result);
        })
    }

    useEffect(() => {
        getUsers();
    },[]);
    

    return (
        <div class="space-y-4">
            <div class="block">
                <div class="grid gap-4 grid-cols-4">
                    <div class="flex block text-gray-700 text-sm font-bold mb-2">Name</div>
                    <div class="flex block text-gray-700 text-sm font-bold mb-2">Role</div>
                    <div class="flex block text-gray-700 text-sm font-bold mb-2">Email</div>
                    <div class="flex block text-gray-700 text-sm font-bold mb-2"></div>
                </div>
            </div>
            <div class="block">
                {Users && Users.map(user =>
                    <div key={user.user_id} class="grid gap-4 grid-cols-4">
                        <div class="flex items-center">{user.first_name}</div>
                        <div class="flex items-center">{user.last_name}</div>
                        <div class="flex items-center">{user.email}</div>
                        <Link class="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline justify-center" to={'update-user-admin/'+user.user_id}>Update User</Link>
                    </div>
                )}
            </div>       
        </div>
        
    );
}
