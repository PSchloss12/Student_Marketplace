// authredirect to make sure the user cannot access the login page if they are signed in already
import React from 'react';
import { Navigate } from 'react-router-dom';
import { userAuthenticated } from './Users';

const AuthRedirect = ({ element: Component, ...rest }) => {
    const isAuthenticated = userAuthenticated();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Component {...rest} />;
};

export default AuthRedirect;