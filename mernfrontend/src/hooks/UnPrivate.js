import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export const UnPrivate = ({ component: Component, ...rest}) => {
    const { authenticated } = useContext(AuthContext);

    return(
        <Route
            {...rest}
            render={(props) => {
                if(authenticated){
                    return(
                        <Redirect to={{ pathname: "/whisky", state: { froms: props.location }}} />
                    )
                }
                return <Component {...props} />
            }}
        />
    )
}