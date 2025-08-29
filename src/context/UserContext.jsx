import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
    let [userLogin, setUserLogin] = useState(null);
    useEffect(() => {
        if(localStorage.getItem('userToken') !== null){
            setUserLogin(localStorage.getItem('userToken'));
        }
    }, []);

    return <UserContext.Provider value={{userLogin, setUserLogin}}>
        {props.children}
    </UserContext.Provider>
}