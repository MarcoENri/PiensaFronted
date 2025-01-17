import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;  // Aquí se define correctamente el tipo de 'children'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();  // Obtén el estado de autenticación
  const navigate = useNavigate();  // Hook para navegar

  if (!isAuthenticated) {
    navigate("/login");  // Si no está autenticado, redirige al login
    return null;
  }

  return <>{children}</>;  // Si está autenticado, renderiza los children
};

export default ProtectedRoute;
