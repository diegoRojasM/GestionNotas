import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode'; // Mantén tu importación actual

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null); // Información del usuario
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Estado para verificar la carga inicial

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);

                // Si el token es válido, mantén el usuario y autenticación
                setUsuario({
                    id: decodedToken.id,
                    rol: decodedToken.rol,
                    nombre: decodedToken.nombre, // Asume que el nombre viene en el token
                });
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error al decodificar el token:', error);
                logout(); // Si falla el token, desloguea
            }
        }
        setLoading(false); // Indicador de carga finalizado
    }, []);

    const login = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            localStorage.setItem('token', token);
            setUsuario({
                id: decodedToken.id,
                rol: decodedToken.rol,
                nombre: decodedToken.nombre, // Asume que el nombre viene en el token
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
        <AuthContext.Provider value={{ usuario, isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
