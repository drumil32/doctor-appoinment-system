import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { hideLoading } from '../../redux/features/alertSlice';
import { Table, message } from 'antd';
import { useDispatch } from 'react-redux';


const Doctors = ({ cookies, removeCookies }) => {

    const [doctorList, setDoctorList] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const { token } = cookies;
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/admin/getAllDoctors', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                dispatch(hideLoading());
                if (res.data.success) {
                    console.log(res.data.doctors);
                    setDoctorList(res.data.doctors);
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

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <span>
                    {record.firstName} {record.lastName}
                </span>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "phone",
            dataIndex: "phone",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === "pending" ? (
                        <button className="btn btn-success">Approve</button>
                    ) : (
                        <button className="btn btn-danger">Reject</button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <Layout removeCookies={removeCookies} >
            <h1 className="text-center m-3">All Doctors</h1>
            <Table columns={columns} dataSource={doctorList} />
        </Layout>
    )
}

export default Doctors