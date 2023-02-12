import React, { useEffect, useState } from 'react'
import { hideLoading } from '../../redux/features/alertSlice';
import { Table, message } from 'antd';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import moment from "moment";

const DoctorAppointments = ({ cookies, removeCookies }) => {
    const [appointments, setAppointments] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const { token } = cookies;
            try {
                const res = await axios.get('/api/doctor/doctor-appointments',
                    {
                        headers: {
                            authorization: 'Bearer ' + token
                        }
                    });
                if (res.data.success) {
                    message.success(res.data.message);
                    console.log(res.data.appointments);
                    setAppointments(res.data.appointments);
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
        //eslint-disable-next-line
    }, []);

    const handleStatus = async (record, status) => {
        const { token } = cookies;
        try {
            const res = await axios.post('/api/doctor/update-appointment-status',
                {
                    appointmentId: record._id,
                    status
                },
                {
                    headers: {
                        authorization: 'Bearer ' + token
                    }
                });
            if (res.data.success) {
                message.success(res.data.message);
                window.location.reload();
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            message.error('some thing went wrong');
        }
    }

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
        },
        {
            title: "Date & Time",
            dataIndex: "date",
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                    {moment(record.time).format("HH:mm")}
                </span>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === "pending" && (
                        <div className="d-flex">
                            <button
                                className="btn btn-success"
                                onClick={() => handleStatus(record, "approved")}
                            >
                                Approved
                            </button>
                            <button
                                className="btn btn-danger ms-2"
                                onClick={() => handleStatus(record, "reject")}
                            >
                                Reject
                            </button>
                        </div>
                    )}
                </div>
            ),
        },
    ];

    return (
        <Layout removeCookies={removeCookies}>
            <h1>Appointment Lists</h1>
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    )
}

export default DoctorAppointments