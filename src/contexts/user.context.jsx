import {createContext, useEffect, useState} from "react";
import {getOrCreateUserDocumentFromAuth, onAuthStateChangeListener} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: (value) => null,
    currentUserDoc: null,
    setCurrentUserDoc: (value) => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserDoc, setCurrentUserDoc] = useState(null);

    const value = { currentUser, setCurrentUser, currentUserDoc, setCurrentUserDoc };

    useEffect(() => {
        const unsubscribe = onAuthStateChangeListener(async (user) => {
            setCurrentUser(user);
            if (user) {
                console.log("Getting userDoc");
                const userDoc = await getOrCreateUserDocumentFromAuth(user);
                console.log("UserDoc: ", userDoc);
                setCurrentUserDoc(userDoc);
            } else {
                setCurrentUserDoc(null);
            }
        });
        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}
