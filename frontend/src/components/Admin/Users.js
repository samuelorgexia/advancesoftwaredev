import React, { useState, useEffect } from "react";

import UserBar from "./UserBar.js"
import Button from "../Buttons/Button.js";

export default function Properties(props) {
    const { users, ...rest } = props;

    const createUser = () => {
        //go to sign up page
    }

    return (
        <div>
            <div className="flex flex-row">
                <h2>Name</h2>
                <h2>Role</h2>
                <h2>Email</h2>
                <h2>Password</h2>
                <Button color="blue" onClick={createUser}>
                    New User
                </Button>
            </div>
            {users.map((user, index) => (
                <UserBar {...rest} key={index} user={user} />
            ))}
        </div>
    );
  }