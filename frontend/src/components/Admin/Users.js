import React, { useState, useEffect } from "react";

import UserBar from "./UserBar.js"

export default function Properties(props) {
    const { users, ...rest } = props;
    return (
        <div>
            <div className="flex flex-row">
                <h2>Name</h2>
                <h2>Role</h2>
                <h2>Email</h2>
                <h2>Password</h2>
            </div>
            {users.map((user, index) => (
                <UserBar {...rest} key={index} user={user} />
            ))}
        </div>
    );
  }