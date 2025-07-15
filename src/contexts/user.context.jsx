import { createContext, useState, useEffect } from "react";
import { OnAuthStateChangedListener, createUserDocFromAuth } from "../utils/firebase/firebase";


// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };


    useEffect(() => {
        const unsubscribe = OnAuthStateChangedListener((user) => {
            if(user)
                createUserDocFromAuth(user);
            setCurrentUser(user);
            console.log(user);
        });
        return unsubscribe;
    }, 
    [])

    return (
        <UserContext.Provider value={ value }>
            {children}
        </UserContext.Provider>
    )

}