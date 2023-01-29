import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, cookies }) => {
    const { token } = cookies;
    if (token) {
        return <Navigate to='/' />
    } else {
        return (
            children
        )
    }
}

export default PublicRoute