import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {jwtDecode} from 'jwt-decode'; // Asegúrate de que está importado correctamente como `default`

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null); // Información del usuario, incluido el rol
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Decodificar el token JWT para extraer datos
                setUsuario({
                    id: decodedToken.id,
                    rol: decodedToken.rol,
                    nombre: decodedToken.nombre, // Incluye el nombre del usuario
                });
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error al decodificar el token:', error);
                logout(); // Si el token es inválido, desloguea al usuario
            }
        }
    }, []);

    const login = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            localStorage.setItem('token', token);
            setUsuario({
                id: decodedToken.id,
                rol: decodedToken.rol,
                nombre: decodedToken.nombre, // Incluye el nombre al guardar el usuario
            });
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error al decodificar el token durante login:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUsuario(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ usuario, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
