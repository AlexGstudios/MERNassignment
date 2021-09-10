import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [activeUser, setActiveUser] = useState({username: ""});
    const [isLoaded, setIsLoaded] = useState(false);

    const checkAuth = async () => {
        const data = await AuthService("authenticated");
        if(data === undefined){
            setActiveUser({_id: "", username: ""});
            setAuthenticated(false);
            setIsLoaded(true);
        }else{
            setActiveUser(data.message.msgBody);
            setAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        checkAuth();
    }, [])

    return(
        <div>
            {isLoaded ?
            (
                <AuthContext.Provider value={{
                        authenticated,
                        setAuthenticated,
                        activeUser,
                        setActiveUser
                    }}
                >
                    {children}
                </AuthContext.Provider>
            ) 
            :(<h1>Loading...</h1>)
            }
        </div>
    )
}

export default AuthProvider;