import { useAuth } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
   
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderiza la ruta protegida
  return children;
};

export default ProtectedRoute;
