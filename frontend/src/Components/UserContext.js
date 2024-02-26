import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = Cookies.get('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const loginuser = (data) => {
        setUser(data);
        Cookies.set('user', JSON.stringify(data), { expires: 0.125 });
    }
    const logoutuser = () => {
        setUser(null);
        Cookies.remove('user');
    }
    return (
        <UserContext.Provider value={{ user, loginuser, logoutuser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
}