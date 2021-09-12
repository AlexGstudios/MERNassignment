import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import AuthService from '../../services/AuthService';


export const Account = () => {

    const { activeUser } = useContext(AuthContext);
    const [userPass, setUserPass] = useState({currentPassword: "", newPassword: ""});
    const [isFlase, setIsFalse] = useState(false);
    const [data, setData] = useState();

    const changeUserData = (e) => {
        setUserPass({...userPass, [e.target.name]: e.target.value});
    }

    const changePassword = async (e) => {
        e.preventDefault();
        const data = await AuthService("updateuser", "put", userPass);
        if(data.isAuthenticated){
            setData(data);
            setIsFalse(true);
        }
    }


    return(
        <div className="account">
            <h1>Account</h1>
            <p>Welcome {activeUser.username}</p>
            <div>
                <form onSubmit={changePassword}>
                    <input
                        type="currentPassword"
                        name="currentPassword"
                        placeholder="Old password"
                        onChange={changeUserData}
                    />
                    <br/>
                    <input
                        type="newPassword"
                        name="newPassword"
                        placeholder="New password"
                        onChange={changeUserData}
                    />
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                {
                    isFlase ? <h3>{data.message.msgBody}</h3>
                    : <div></div>
                }
            </div>
        </div>
    )
}