import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/axios';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        // Verify token with backend
        const response = await api.get('/auth/verify');

        if (response.data.valid) {
          setIsAuthenticated(true);
        } else {
          // If token is invalid, remove it
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (isLoading) {
    // You can replace this with a proper loading component
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;