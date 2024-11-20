import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

const LoginPage = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, contrasena }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                login(data.token); // Usamos el contexto para manejar el inicio de sesión
                alert('Inicio de sesión exitoso');
                
                // Redirigir según el rol del usuario
                const decodedToken = JSON.parse(atob(data.token.split('.')[1])); // Decodificar JWT manualmente
                if (decodedToken.rol === 'profesor') {
                    navigate('/notas'); // Redirigir a la página de notas del profesor
                } else if (decodedToken.rol === 'estudiante') {
                    navigate('/mis-notas'); // Redirigir a la página de notas del estudiante
                }
            } else {
                alert(data.mensaje || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al iniciar sesión');
        }
    };
    

    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
            <p>No tienes una cuenta? <Link to="/registro" className="nav-link">Regístrate aquí</Link></p>
        </div>
    );
};

export default LoginPage;
