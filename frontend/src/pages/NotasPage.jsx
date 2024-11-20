import  { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

const NotasPage = () => {
    const [notas, setNotas] = useState([]);
    const navigate = useNavigate();
    const { usuario, logout } = useContext(AuthContext); // Acceso al contexto para obtener el rol

    const cargarNotas = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/notas', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                setNotas(data);
            } else {
                alert(data.mensaje || 'Error al cargar las notas');
            }
        } catch (error) {
            console.error('Error al cargar notas:', error);
            alert('Hubo un problema al cargar las notas.');
        }
    };

    useEffect(() => {
        cargarNotas();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="notas-container">
            <h2>Mis Notas</h2>
            {usuario?.rol === 'profesor' && (
                <p>Viendo todas las notas de todos los estudiantes</p>
            )}
            {usuario?.rol === 'estudiante' && (
                <p>Viendo solo tus notas</p>
            )}
            <button className="boton-logout" onClick={handleLogout}>
                Cerrar Sesión
            </button>
            <ul className="notas-list">
                {notas.map((nota) => (
                    <li className="nota-item" key={nota._id}>
                        <h3>{nota.titulo}</h3>
                        <p>Descripción: {nota.descripcion}</p>
                        <p>Calificación: {nota.calificacion}</p>
                        <p>Estudiante: {nota.estudiante?.nombre || 'N/A'}</p>
                        <p>Profesor: {nota.profesor?.nombre || 'N/A'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotasPage;