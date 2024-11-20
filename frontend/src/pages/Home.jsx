
import { Link } from 'react-router-dom';


const HomePage = () => {
    return (
        <div className="home-container">
            <h1>Bienvenido al Sistema de Gestión de Notas</h1>
            <p>
                <Link className="nav-link" to="/registro">Registrarse</Link> | 
                <Link className="nav-link" to="/login"> Iniciar Sesión</Link>
            </p>
        </div>
    );
};

export default HomePage;
