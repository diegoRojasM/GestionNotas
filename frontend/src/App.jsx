import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import  AuthContext  from './context/AuthContext'; // Contexto de autenticación
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import NotasPage from './pages/NotasPage';
import EstudiantesPage from './pages/EstudiantesPage';
import ErrorPage from './pages/ErrorPage';
import PropTypes from 'prop-types';
import Home from './pages/Home'


// Componente para proteger rutas según el rol
const RutaProtegida = ({ element, rolesPermitidos }) => {
    const { usuario } = useContext(AuthContext);

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (!rolesPermitidos.includes(usuario.rol)) {
        return <Navigate to="/" replace />;
    }

    return element;
};
RutaProtegida.propTypes = {
  element: PropTypes.element.isRequired, // Se asegura de que 'element' sea un componente React válido
  rolesPermitidos: PropTypes.arrayOf(PropTypes.string).isRequired // Se asegura de que 'rolesPermitidos' sea un array de strings
};


const App = () => {
    return (
        <Router>
            <Routes>

                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegistroPage />} />

                {/* Rutas protegidas */}
                <Route
                    path="/notas"
                    element={
                        <RutaProtegida
                            element={<NotasPage />}
                            rolesPermitidos={['profesor']}
                        />
                    }
                />
                <Route
                    path="/estudiantes"
                    element={
                        <RutaProtegida
                            element={<EstudiantesPage />}
                            rolesPermitidos={['profesor']}
                        />
                    }
                />

                <Route
                    path="/mis-notas"
                    element={
                        <RutaProtegida
                            element={<NotasPage />}
                            rolesPermitidos={['estudiante']}
                        />
                    }
                />

                {/* Ruta por defecto (Error 404) */}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
};

export default App;
