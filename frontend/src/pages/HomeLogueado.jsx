import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const HomeLogueado = () => {
    const { usuario, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="home-logueado-container">
            <h1>Bienvenido {usuario?.rol === 'profesor' ? `Profesor ${usuario.nombre}` : usuario.nombre}</h1>
            <p>Selecciona una opción:</p>
            <div className="botones-navegacion">
                {usuario?.rol === 'profesor' && (
                    <>
                        <button onClick={() => navigate('/notas')}>Ver Todas las Notas</button>
                        <button onClick={() => navigate('/profesor/estudiantes')}>
                            Ver Lista de Estudiantes
                        </button>
                    </>
                )}
                {usuario?.rol === 'estudiante' && (
                    <button onClick={() => navigate('/mis-notas')}>Ver Mis Notas</button>
                )}
            </div>
            <button className="boton-logout" onClick={handleLogout}>
                Cerrar Sesión
            </button>
        </div>
    );
};

export default HomeLogueado;
