import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { DatePicker, TimePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const BookingPage = ({ cookies, removeCookies }) => {
    const [doctor, setDoctor] = useState(null);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const params = useParams();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);

    // get user data
    useEffect(() => {
        const { token } = cookies;
        const getDoctorData = async () => {
            try {
                dispatch(showLoading());
                const res = await axios.post(
                    '/api/doctor/getDoctorById',
                    { doctorId: params.doctorId },
                    {
                        headers: {
                            authorization: 'Bearer ' + token
                        }
                    }
                );
                dispatch(hideLoading());
                if (res.data.success) {
                    message.success(res.data.message);
                    setDoctor(res.data.doctor);
                    console.log(res.data.doctor);
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
        //eslint-disable-next-line
    }, [cookies]);

    const handleBooking = async () => {
        const { token } = cookies;
        try {
            if (!date || !time) {
                return alert('date and time is required');
            }
            dispatch(showLoading());
            console.log(time);
            const res = await axios.post(
                '/api/user/book-appointment',
                {
                    doctorId: params.doctorId,
                    doctorInfo: doctor,
                    userInfo: user,
                    date,
                    time
                },
                {
                    headers: {
                        authorization: 'Bearer ' + token
                    }
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                setDoctor(res.data.doctor);
                console.log(res.data.doctor);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            message.error('some thing went wrong');
        }
    }

    const checkAvailability = async (req, res) => {
        const { token } = cookies;
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/user/booking-avalibility',
                { doctorId: params.doctorId, date, time },
                {
                    headers: {
                        authorization: 'Bearer ' + token
                    }
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                setIsAvailable(true);
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            message.error('some thing went wrong');
        }
    }

    return (
        <Layout removeCookies={removeCookies}>
            <h3>Booking Page</h3>
            <div className="container m-2">
                {doctor && (
                    <div>
                        <h4>
                            Dr.{doctor.firstName} {doctor.lastName}
                        </h4>
                        <h4>Fees : {doctor.feesPerCunsaltation}</h4>
                        <h4>
                            Timings : {doctor.timings && doctor.timings[0]} -{" "}
                            {doctor.timings && doctor.timings[1]}{" "}
                        </h4>
                        <div className="d-flex flex-column w-50">
                            <DatePicker
                                className="m-2"
                                format="DD-MM-YYYY"
                                onChange={
                                    (value) => {
                                        setIsAvailable(false);
                                        setDate(moment(value).format("DD-MM-YYYY"))
                                    }
                                }
                            />
                            <TimePicker
                                format="HH:mm"
                                className="m-2"
                                onChange={
                                    (value) => {
                                        setIsAvailable(false);
                                        setTime(moment(value).format("HH:mm"));
                                    }
                                }
                            />
                            <button className="btn btn-primary mt-2" onClick={checkAvailability}>
                                Check Availability
                            </button>
                            {
                                isAvailable &&
                                <button className="btn btn-dark mt-2" onClick={handleBooking}>
                                    Book Now
                                </button>
                            }
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default BookingPage