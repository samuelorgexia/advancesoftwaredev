import React, { useState, useEffect } from "react";

import userData from "./users.json"
import Users from "../../components/Admin/Users.js"

export default function userAdmin(props) { 

    const users = Object.values(userData)
        .map((user, index) => {
            return {
                ...user,
            }
        })

    return (
        <>
            <Users users={users} />
        </>
    );
}
