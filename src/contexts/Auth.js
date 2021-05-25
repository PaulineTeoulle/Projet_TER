import React from 'react';

export default React.createContext({
    isAuthenticated: false,
    setIsAuthenticated: value =>{},
    isAdmin: false,
    setIsAdmin: value =>{},
    isUser: false,
    setIsUser: value =>{},
    isSuperAdmin: false,
    setIsSuperAdmin: value =>{},
});