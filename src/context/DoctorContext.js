import React, { createContext, useState, useEffect } from 'react';

// Create the Doctor Context
export const DoctorContext = createContext();

// Create the Doctor Context Provider
export const DoctorContextProvider = ({ children }) => {
    const [doctors, setDoctors] = useState([]);

    // Load doctors data from local storage on initial render
    useEffect(() => {
        const storedDoctors = localStorage.getItem('doctors');
        if (storedDoctors) {
            setDoctors(JSON.parse(storedDoctors));
        } else {
            setDoctors([]); // Provide a default value when stored data is undefined
        }
    }, []);

    // Save doctors data to local storage when it changes
    useEffect(() => {
        localStorage.setItem('doctors', JSON.stringify(doctors));
    }, [doctors]);

    // Add a doctor to the doctors list
    const addDoctor = (doctor) => {
        setDoctors((prevDoctors) => [...prevDoctors, doctor]);
    };

    // Remove a doctor from the doctors list
    const removeDoctor = (doctorId) => {
        setDoctors((prevDoctors) =>
            prevDoctors.filter((doctor) => doctor.id !== doctorId)
        );
    };

    // Clear all doctors from the doctors list
    const clearDoctors = () => {
        setDoctors([]);
    };

    // Context value to be provided
    const doctorContextValue = {
        doctors,
        addDoctor,
        removeDoctor,
        clearDoctors,
    };

    return (
        <DoctorContext.Provider value={doctorContextValue}>
            {children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
