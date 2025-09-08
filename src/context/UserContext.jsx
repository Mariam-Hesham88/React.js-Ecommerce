import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
    let [userLogin, setUserLogin] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) setUserLogin(token);
    }, []);


    return <UserContext.Provider value={{ userLogin, setUserLogin }}>
        {props.children}
    </UserContext.Provider>
}