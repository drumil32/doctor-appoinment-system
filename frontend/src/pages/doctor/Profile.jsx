import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { message } from 'antd';
import { useParams } from 'react-router-dom';

const Profile = ({ cookies, removeCookies }) => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [doctor, setDoctor] = useState({})
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {

            const { token } = cookies;
            try {
                dispatch(showLoading());
                const res = await axios.get(`/api/doctor/getDoctorInfo`, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                dispatch(hideLoading());
                if (res.data.success) {
                    console.log(res.data.doctor);

                    setDoctor(res.data.doctor);
                } else {
                    message.error(res.data.message);
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
        <Layout removeCookies={removeCookies}>
            <div>Profile</div>
        </Layout>
    )
}

export default Profile