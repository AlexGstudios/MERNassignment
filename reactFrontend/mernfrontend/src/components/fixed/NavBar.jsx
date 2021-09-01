import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

export const Navbar = () => {

    const [isAuth, setIsAuth] = useState(false);

    const logout = () => {

    }
    
    const authNavbar = () => {
        return(
            <>
                <NavLink to="/map">Map</NavLink>
                <NavLink to="/account">Account</NavLink>
                <NavLink to="/" onClick={logout()}>Logout</NavLink>
                <button onClick={() => setIsAuth(false)}>AUTH</button>
            </>
        )
    }

    const unAuthNavbar = () => {
        return(
            <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
                {/* <button onClick={() => setIsAuth(true)}>UNAUTH</button> */}
            </>
        )
    }

    return(
        <div className="navbar">
            {isAuth ? authNavbar() : unAuthNavbar()}
        </div>
    )
}