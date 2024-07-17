import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './auth/context/AuthContext';
import { LoginPage } from './auth/pages/LoginPage';
import { FormRoutes } from './routes/FormRoutes';

export const OPFormsApp = () => {

    const { login } = useContext(AuthContext);

    return (
        <Routes>
            {
                login.isAuth
                    ? (
                        <Route path='/*' element={<FormRoutes />} />
                    )
                    : <>
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/*' element={<Navigate to="/login" /> } />
                    </>
                    
            }
        </Routes>
    );
}