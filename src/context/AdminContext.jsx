import { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext(null); 

export const AdminProvider = ({ children }) => { 

    const [admin, setAdmin] = useState(() => {
        const guardado = localStorage.getItem('admin');
        return guardado ? JSON.parse(guardado) : null;
    });

    useEffect(() => {
        if (admin) {
            localStorage.setItem('admin', JSON.stringify(admin));
        } else {
            localStorage.removeItem('admin');
        }
    }, [admin]);

    const guardarSesion = (admin) => setAdmin(admin);
    const cerrarSesion = () => setAdmin(null);

    return (
        <AdminContext.Provider value={{ admin, guardarSesion, cerrarSesion }}>
            {children}
        </AdminContext.Provider>
    );
};