import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/chat';
import Login from '../pages/login';
import Register from '../pages/register';
import ForgotPassword from '../pages/forgotpassword';
import Profile from '../pages/profile';
import PrivateRoute from './PrivateRoute';

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={
                <PrivateRoute>
                    <HomePage />
                </PrivateRoute>
            } />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/profile' element={
                <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            } />
        </Routes>
    );
};

export default Router;