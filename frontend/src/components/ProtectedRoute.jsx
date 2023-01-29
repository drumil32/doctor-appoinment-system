import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, cookies, removeCookies }) => {
    const { token } = cookies;
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                dispatch(showLoading());
                console.log('we are here')
                const res = await axios.get('/api/user/getUserData',
                    {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    }
                )
                dispatch(hideLoading());
                if (res.data.success) {
                    dispatch(setUser(res.data.user));
                } else {
                    removeCookies('token');
                    navigate('/login');
                }
            } catch (error) {
                removeCookies('token');
                dispatch(hideLoading());
            }
        }
        if (!user)
            getUser();
    }, [dispatch, navigate, removeCookies, token, user])

    if (token) {
        return (
            children
        )
    } else {
        return <Navigate to='/login' />
    }

}

export default ProtectedRoute;