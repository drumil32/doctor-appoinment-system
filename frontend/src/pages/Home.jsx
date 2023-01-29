import axios from 'axios';
import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';

const Home = ({ cookies, removeCookies }) => {

    // get user data
    // useEffect(() => {
    //     const { token } = cookies;
    //     const getUserData = async () => {
    //         try {
    //             const res = await axios.get(
    //                 '/api/user/getUserData',
    //                 {
    //                     headers: {
    //                         authorization: 'Bearer ' + token
    //                     }
    //                 }
    //             )
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     getUserData();
    // }, [cookies])

    return (
        <Layout removeCookies={removeCookies}>
            <h1>Home Page</h1>
        </Layout>
    );
}

export default Home;

