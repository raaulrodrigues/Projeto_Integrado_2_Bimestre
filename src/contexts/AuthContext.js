import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLoggedInUserDetails, logoutUserApi } from '../api/userService';

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        const validateSession = async () => {
            setLoadingAuth(true);
            try {
                const currentUser = await getLoggedInUserDetails();
                if (currentUser && currentUser.id) {
                    setUser(currentUser);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoadingAuth(false);
            }
        };
        validateSession();
    }, []);

    const loginContext = (userDataFromServer) => {
        if (userDataFromServer && userDataFromServer.id) {
            setUser(userDataFromServer);
            setIsAuthenticated(true);
        } else {
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    const logoutContext = async () => {
        setUser(null);
        setIsAuthenticated(false);
        try {
            await logoutUserApi();
        } catch (error) {
        }
    };

    const value = {
        user,
        isAuthenticated,
        loadingAuth,
        loginContext,
        logoutContext
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};