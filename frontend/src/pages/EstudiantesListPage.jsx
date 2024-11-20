import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const EstudiantesListPage = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarEstudiantes = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/usuarios/estudiantes', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                setEstudiantes(data);
            } catch (error) {
                console.error('Error al cargar estudiantes:', error);
            }
        };

        cargarEstudiantes();
    }, []);

    return (
        <div className="estudiantes-list">
            <h1>Lista de Estudiantes</h1>
            <ul>
                {estudiantes.map((estudiante) => (
                    <li key={estudiante._id}>
                        {estudiante.nombre} ({estudiante.correo})
                        <button onClick={() => navigate(`/profesor/estudiantes/${estudiante._id}/agregar-nota`)}>Agregar Nota</button>
                        <button onClick={() => navigate(`/profesor/estudiantes/${estudiante._id}/ver-notas`)}>Ver Notas</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EstudiantesListPage;
