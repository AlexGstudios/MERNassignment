import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import AuthService from '../../services/AuthService';

export const Navbar = () => {

    const { authenticated, setAuthenticated, setActiveUser} = useContext(AuthContext);
    const history = useHistory();

    const logout = async () => {
        const data = await AuthService("logout");
        if(!data.message.msgError){
            setActiveUser(data.message.msgBody);
            setAuthenticated(false);
            history.push("/login");
        }else{
            alert(data.message.msgBody);
        }
    }
    
    const authNavbar = () => {
        return(
            <>
                <NavLink to="/whisky">Whisky</NavLink>
                <NavLink to="/account">Account</NavLink>
                <NavLink to="/login" onClick={logout}>Logout</NavLink>
            </>
        )
    }

    const unAuthNavbar = () => {
        return(
            <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
            </>
        )
    }

    return(
        <div className="navbar">
            { authenticated ? authNavbar() : unAuthNavbar()}
        </div>
    )
}