import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';


const PrivateRoute = ({ children }) => {
    // get user from context
    const user = useContext(AuthContext);
    //if user have authenticated => render home else => navigate to login
    return user ? children : <Navigate to='/login' />
};

export default PrivateRoute;