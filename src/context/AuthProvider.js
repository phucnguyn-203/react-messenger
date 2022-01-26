import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from '../config/firebase.config';
import Loading from '../components/Loading';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // when Authentication state change
        const unSubscribe = onAuthStateChanged(authentication, user => {
            if (user) {
                setUser(user);
                setIsLoading(false);
            } else {
                setUser(null);
                setIsLoading(false);
            }
        });

        //clean up function when component will unmount
        return () => unSubscribe();
    }, []);

    return (
        <AuthContext.Provider value={user}>
            {isLoading ? <Loading /> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;