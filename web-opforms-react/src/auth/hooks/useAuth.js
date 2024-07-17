import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginReducer } from "../reducers/loginReducer";
import { loginUser } from "../services/authService";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined,
}
export const useAuth = () => {

    const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const handlerLogin = async ({ username, password }) => {

        try {
            const response = await loginUser({ username, password });
            const token = response.data.access_token;
            const user = { username: username }
            dispatch({
                type: 'login',
                payload: { user },
            });
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user,
            }));
            sessionStorage.setItem('token', `Bearer ${token}`);
            navigate('/forms');
        } catch (error) {
            if (error.response?.status == 401) {
                Swal.fire('Error Login', 'Invalid username or password', 'error');
            } else if (error.response?.status == 403) {
                Swal.fire('Error Login', 'You do not have access to the resource or permissions!', 'error');
            } else {
                throw error;
            }
        }
    }

    const handlerLogout = () => {
        dispatch({
            type: 'logout',
        });
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear();
    }
    return {
        login,
        handlerLogin,
        handlerLogout,
    }
}