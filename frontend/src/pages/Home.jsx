import axios from 'axios';
import React, { useEffect } from 'react';

const Home = ({ cookies }) => {

    // get user data
    useEffect(() => {
        const { token } = cookies;
        const getUserData = async () => {
            try {
                const res = await axios.get(
                    '/api/user/getUserData',
                    {
                        headers: {
                            authorization: 'Bearer ' + token
                        }
                    }
                )
            } catch (error) {
                console.log(error)
            }
        }
        getUserData();
    }, [cookies])

    return (
        <div>
            home
        </div>
    );
}

export default Home;

