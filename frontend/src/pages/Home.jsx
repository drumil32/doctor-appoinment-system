import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { Row, message } from 'antd';
import { useDispatch } from 'react-redux';
import DoctorList from '../components/DoctorList';

const Home = ({ cookies, removeCookies }) => {

    const [doctors, setDoctors] = useState(null)
    const dispatch = useDispatch();

    // get user data
    useEffect(() => {
        const { token } = cookies;
        const getDoctorData = async () => {
            try {
                dispatch(showLoading());
                const res = await axios.get(
                    '/api/user/getAllDoctor',
                    {
                        headers: {
                            authorization: 'Bearer ' + token
                        }
                    }
                );
                dispatch(hideLoading());
                if (res.data.success) {
                    message.success(res.data.message);
                    setDoctors(res.data.doctorList);
                    console.log(res.data.doctorList)
                } else {
                    message.error(res.data.message);
                }
            } catch (error) {
                console.log(error);
                dispatch(hideLoading());
                message.error('some thing went wrong');
            }
        }
        getDoctorData();
    }, [cookies])

    return (
        <Layout removeCookies={removeCookies}>
            <h1 className="text-center">Home Page</h1>
            <Row>
                {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
            </Row>
        </Layout>
    );
}

export default Home;

