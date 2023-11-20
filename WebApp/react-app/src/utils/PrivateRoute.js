import React from "react";
import {Route, Link} from "react-router-dom";
import { useUser } from "./UserContext";

/**
 * Creates a route to specified component
 * 
 */
function PrivateRoute({ component: Component, ...rest }) {
    const {user} = useUser();
    return (
        <Route
            {...rest}
            render={props =>
                user ? (
                    <Component {...props} />
                ) : (
                  <div><Link to={'/login'}>Log In</Link> to view</div>
                )
            }
        />
    );
}

export default PrivateRoute;