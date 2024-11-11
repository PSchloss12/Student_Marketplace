import React from 'react';
import { Navigate } from 'react-router-dom';
import { userAuthenticated } from './Users';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = userAuthenticated();

    if (!isAuthenticated) {
        // if the user is not authenticated, move them to the login page
        return <Navigate to="/auth" replace state={{ message: "Unauthorized access. Please log in to continue." }} />;
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;

