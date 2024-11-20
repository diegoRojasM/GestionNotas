import { useContext } from 'react';
import AuthContext from '../context/AuthContext';


const EstudiantesPage = () => {
    const { usuario } = useContext(AuthContext);

    return (
        <div className="estudiantes-container">
            <h1>Bienvenido, {usuario?.nombre || 'Estudiante'}</h1>
            <p>Esta es tu página personal.</p>
            <h2>Información del Estudiante</h2>
            <ul>
                <li><strong>Nombre:</strong> {usuario?.nombre}</li>
                <li><strong>Correo:</strong> {usuario?.correo}</li>
                <li><strong>Rol:</strong> {usuario?.rol}</li>
            </ul>
            <p>En esta página, solo puedes acceder a tu propia información y tus notas.</p>
        </div>
    );
};

export default EstudiantesPage;
