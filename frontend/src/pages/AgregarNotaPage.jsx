import{ useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AgregarNotaPage = () => {
    const { id } = useParams(); // ID del estudiante
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [calificacion, setCalificacion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/notas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    titulo,
                    descripcion,
                    calificacion,
                    estudiante: id,
                }),
            });

            if (response.ok) {
                alert('Nota agregada exitosamente');
                navigate('/profesor/estudiantes');
            } else {
                alert('Error al agregar nota');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Agregar Nota</h1>
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
                <button type="submit">Agregar Nota</button>
            </form>
        </div>
    );
};

export default AgregarNotaPage;
