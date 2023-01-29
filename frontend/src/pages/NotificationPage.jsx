import React, { useEffect } from 'react'
import { hideLoading } from '../redux/features/alertSlice';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import axios from 'axios';

const NotificationPage = ({ cookies }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const { token } = cookies;
            try {
                const res = await axios.get('/api/user/get-all-notification', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                if (!res.data.success) {
                    message.error(res.data.message);
                } else {
                    console.log(res.data);
                }
            } catch (error) {
                console.log(error);
                dispatch(hideLoading());
                message.error('some thing went wrong');
            }
        }
        fetchData();
    }, []);
    return (
        <div>NotificationPage</div>
    )
}

export default NotificationPage