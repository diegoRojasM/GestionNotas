import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import  AuthContext  from './context/AuthContext'; // Contexto de autenticación
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import NotasPage from './pages/NotasPage';

import ErrorPage from './pages/ErrorPage';
import PropTypes from 'prop-types';
import Home from './pages/Home'

import EstudiantesListPage from './pages/EstudiantesListPage';
import AgregarNotaPage from './pages/AgregarNotaPage';
import ActualizarNotaPage from './pages/ActualizarNotaPage';
import NotasEstudiantePage from './pages/NotasEstudiantePage';
import HomeLogueado from './pages/HomeLogueado';

const RutaProtegida = ({ element, rolesPermitidos }) => {
    const { usuario, isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Cargando...</div>; // Muestra un indicador de carga mientras se verifica el estado
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!rolesPermitidos.includes(usuario.rol)) {
        return <Navigate to="/" replace />;
    }

    return element;
};

RutaProtegida.propTypes = {
    element: PropTypes.element.isRequired,
    rolesPermitidos: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const App = () => {
    return (
        <Router>
            <Routes>

                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegistroPage />} />

                {/* Página centralizada después del login */}
                <Route
                    path="/homeLogueado"
                    element={
                        <RutaProtegida
                            element={<HomeLogueado />}
                            rolesPermitidos={['profesor', 'estudiante']}
                        />
                    }
                />

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
                    path="/profesor/estudiantes"
                    element={
                        <RutaProtegida
                            element={<EstudiantesListPage />}
                            rolesPermitidos={['profesor']}
                        />
                    }
                />
                <Route
                    path="/profesor/estudiantes/:id/agregar-nota"
                    element={
                        <RutaProtegida
                            element={<AgregarNotaPage />}
                            rolesPermitidos={['profesor']}
                        />
                    }
                />
                <Route
                    path="/profesor/estudiantes/:id/actualizar-nota/:notaId"
                    element={
                        <RutaProtegida
                            element={<ActualizarNotaPage />}
                            rolesPermitidos={['profesor']}
                        />
                    }
                />
                <Route
                    path="/profesor/estudiantes/:id/ver-notas"
                    element={
                        <RutaProtegida
                            element={<NotasEstudiantePage />}
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
