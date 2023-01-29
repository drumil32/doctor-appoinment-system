import React from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';

const Login = ({ setCookies }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinishHandler = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/user/login', values);
            dispatch(hideLoading());
            console.log(res.data);
            if (res.data.success) {
                setCookies('token', res.data.token);
                message.success('registerd successfully!');
                navigate('/')
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error('some thing went wrong');
        }
    }
    return (
        <div className="form-containner">
            <Form layout='vertical' onFinish={onFinishHandler} className="register-form">
                <h1 className="text-center">Login form</h1>
                <Form.Item label="Email" name="email">
                    <Input type="email" required />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" required />
                </Form.Item>
                <Link to="/register" className="m-2">Not Registered Yet?</Link>
                <button className="btn btn-primary" type="submit">Login</button>
            </Form>
        </div>
    );
}

export default Login;
