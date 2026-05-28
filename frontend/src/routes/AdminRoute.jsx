import { Navigate, useLocation } from 'react-router-dom';
import { AuthService } from '../services/api';

export default function AdminRoute({ children }) {
  const location = useLocation();
  const user = AuthService.getUser();

  // No autenticado
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // No autorizado
  if (user.role !== 'ADMIN') {
    return <Navigate to="/403" replace />;
  }

  return children;
}
