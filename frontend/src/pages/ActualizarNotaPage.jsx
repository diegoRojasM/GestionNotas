import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ActualizarNotaPage = () => {
    const { id, notaId } = useParams(); // `id` del estudiante, `notaId` de la nota
    const navigate = useNavigate();

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [calificacion, setCalificacion] = useState('');

    useEffect(() => {
        const cargarNota = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/notas/${notaId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                setTitulo(data.titulo);
                setDescripcion(data.descripcion);
                setCalificacion(data.calificacion);
            } catch (error) {
                console.error('Error al cargar nota:', error);
            }
        };

        cargarNota();
    }, [notaId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/notas/${notaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    titulo,
                    descripcion,
                    calificacion,
                }),
            });

            if (response.ok) {
                alert('Nota actualizada exitosamente');
                navigate(`/profesor/estudiantes/${id}/ver-notas`);
            } else {
                alert('Error al actualizar la nota');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Actualizar Nota</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                ></textarea>
                <input
                    type="number"
                    placeholder="Calificación"
                    value={calificacion}
                    onChange={(e) => setCalificacion(e.target.value)}
                    required
                />
                <button type="submit">Actualizar Nota</button>
            </form>
        </div>
    );
};

export default ActualizarNotaPage;
