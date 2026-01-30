import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RoleBasedRouteProps {
    children: React.ReactElement; // Use ReactElement instead of JSX.Element
    allowedRoles: string[];
}

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ children, allowedRoles }) => {
    const { isAuthenticated, loading, userData } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (userData && !allowedRoles.includes(userData.role || 'user')) {
        // Redirect to home if authorized but not validation role
        return <Navigate to="/" replace />;
    }

    return children;
};
