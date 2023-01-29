import React from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/RegisterStyles.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch
    const onFinishHandler = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/user/register', values);
            dispatch(hideLoading());
            if (res.data.success) {
                message.success('registerd successfully!');
                navigate('/login')
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
                <h1 className="text-center">Register form</h1>
                <Form.Item label="Name" name="name">
                    <Input type="text" required />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type="email" required />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" required />
                </Form.Item>
                <Link to="/login" className="m-2">Already Registered?</Link>
                <button className="btn btn-primary" type="submit">Register</button>
            </Form>
        </div>
    );
}

export default Register;
