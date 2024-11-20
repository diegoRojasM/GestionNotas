import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <h1>404 - Página No Encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default ErrorPage;
