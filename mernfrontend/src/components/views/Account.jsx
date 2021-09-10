import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';


export const Account = () => {

    const { activeUser } = useContext(AuthContext);

    return(
        <div className="account">
            <h1>Account</h1>
            <p>Welcome {activeUser.username}</p>
        </div>
    )
}