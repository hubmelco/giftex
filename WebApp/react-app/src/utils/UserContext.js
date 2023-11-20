//This is used to store the user data when they log in (react hook: useContext) - Jon
import {createContext, useContext, useState, useEffect} from 'react';
import {app} from './ServerConnection'


const UserContext = createContext(null);
/**
 * gets the currently logged in user
 * @returns {null}
 */
export const useUser = () => {
    return useContext(UserContext);
}

/**
 * provides the logged in users to all the pages that it wraps
 * @param children the pages it wraps
 */
export const UsersProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        app.reAuthenticate()
            .then(({user}) => {
                setUser(user);
            })
            .catch(() => {
                //Do nothing, user was not logged in previously
            });
    }, [user]);

    return (
        <UserContext.Provider
            value={{
                user
            }}
        >
            {children}
        </UserContext.Provider>
    )
}