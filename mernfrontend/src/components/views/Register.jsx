import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/AuthService';

export const Register = () => {

    const [user, setUser] = useState({username: "", password: ""});
    const history = useHistory();
    
    const changeUserData = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const newUser = async (e) => {
        e.preventDefault();
        const data = await AuthService("register", "post", user);
        if(!data.message.msgError){
            history.push("/login");
        }else{
            alert(data.message.msgBody)
        }
    }

    return(
        <div className="registerview">
            <h1>Register</h1>
            <div className="register">
                <div className="registerwindow">
                    <form onSubmit={newUser}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={changeUserData}
                        />
                        <br/>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={changeUserData}
                        />
                        <br/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}