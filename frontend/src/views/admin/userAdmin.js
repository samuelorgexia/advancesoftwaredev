import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


export default function UserAdmin(props) { 

    const [Users, setUsers] = useState([]);
    
/*    const users = Object.values(userList)
        .map((user, index) => {
            return {
                ...user,
            }
        })
*/
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
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {Users && Users.map(user =>
                        <tr key={user.user_id}>
                            <td>{user.first_name} {user.last_name}</td>
                            <td>{user.role}</td>
                            <td>{user.email}</td>
                            <Link to={'update-user-admin/'+user.user_id}>Update User</Link>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
