import React, { useState, useEffect } from "react";

import Button from "../Buttons/Button.js";

export default function UserBar(props) {
    const { user } = props;

    const deleteConfirmation = () => {
        window.alert(`Delete user ${user.name}?`)
    }

    return (
        <div className="flex flex-row">
            <h3 className="px-1">{user.name}</h3>
            <h3 className="px-1">{user.role}</h3>
            <h3 className="px-1">{user.email}</h3>
            <h3 className="px-1">{user.password}</h3>
            <Button color="red" onClick={deleteConfirmation}>
                Delete
            </Button>
        </div>
    )
}