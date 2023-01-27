import React from 'react';
import { Form, Input } from 'antd';

const Register = () => {
    const onFinishHandler = () => {

    }
    return (
        <div className="form-containner">
            <Form layout='vertical' onFinish={onFinishHandler}>
                <Form.Item>
                    <Input type="text" required></Input>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Register;
