// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const PatientContext = createContext();



const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    const handleLogoutClick = () => {
        setUser(null);
    }


    useEffect(() => {
        const userData = localStorage.getItem('patientData');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);


    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('patientData', JSON.stringify(userData));
    };

    return (
        <PatientContext.Provider value={{ user, updateUser, handleLogoutClick }}>
            {children}
        </PatientContext.Provider>
    );
};

export { PatientContext, UserProvider };