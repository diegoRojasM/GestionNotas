import { useState } from 'react';
import { Link } from 'react-router-dom'; 


const RegistroPage = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [rol, setRol] = useState('estudiante'); // Por defecto se registra como estudiante

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/usuarios/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, correo, contrasena, rol })
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.mensaje || 'No se pudo registrar el usuario'}`);
            } else {
                console.log('Registro exitoso. Ahora puedes iniciar sesión.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al registrar al usuario.');
        }
    };

    return (
        <div className="register-container">
            <h1>Registro</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                />
                <select value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value="estudiante">Estudiante</option>
                    <option value="profesor">Profesor</option>
                </select>
                <button type="submit">Registrar</button>
            </form>
            <p>¿Ya tienes una cuenta? <Link to="/login" className="nav-link">Inicia sesión aquí</Link></p>
        </div>
    );
};

export default RegistroPage;
