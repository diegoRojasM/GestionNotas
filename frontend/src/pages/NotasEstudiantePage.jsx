import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const NotasEstudiantePage = () => {
    const { id } = useParams(); // `id` del estudiante
    const [notas, setNotas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarNotas = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/notas?estudiante=${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                setNotas(data);
            } catch (error) {
                console.error('Error al cargar notas:', error);
            }
        };

        cargarNotas();
    }, [id]);

    const handleDelete = async (notaId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/notas/${notaId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    setNotas(notas.filter((nota) => nota._id !== notaId));
                    alert('Nota eliminada con éxito');
                } else {
                    alert('Error al eliminar la nota');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div>
            <h1>Notas del Estudiante</h1>
            <ul>
                {notas.map((nota) => (
                    <li key={nota._id}>
                        <h3>{nota.titulo}</h3>
                        <p>{nota.descripcion}</p>
                        <p>Calificación: {nota.calificacion}</p>
                        <button onClick={() => navigate(`/profesor/estudiantes/${id}/actualizar-nota/${nota._id}`)}>Actualizar</button>
                        <button onClick={() => handleDelete(nota._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/profesor/estudiantes')}>Volver</button>
        </div>
    );
};

export default NotasEstudiantePage;
