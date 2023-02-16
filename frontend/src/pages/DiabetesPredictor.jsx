import React from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useState } from 'react'

function DiabetesPredictor({ removeCookies }) {
    const [data, setData] = useState({
        'Pregnancies': 0,
        'Glucose': 0,
        'BloodPressure': 0,
        'SkinThickness': 0,
        'Insulin': 0,
        'BMI': 0,
        'DiabetesPedigreeFunction': 0,
        'Age': 0,
    })
    const onChange = (e) => {
        var { name, value } = e.target;
        if (name !== 'BMI' && name !== 'DiabetesPedigreeFunction')
            value = (parseInt(value, 10));
        else
            value = parseFloat(value);
        setData(prevState => ({ ...prevState, [name]: value }));
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        const input_data_for_model = { ...data };
        // const myJSON = JSON.stringify(input_data_for_model);
        const response = await axios.post('http://ade6-35-229-209-140.ngrok.io/diabetes_prediction', input_data_for_model)
        console.log(response.data);
    }
    return (
        <Layout removeCookies={removeCookies}>
            <h1>Appointment Lists</h1>
            <form action="post" onSubmit={onSubmit}>
                <input type="text" onChange={onChange} name="Pregnancies" placeholder='give Pregnancies' />
                <input type="text" onChange={onChange} name="Glucose" placeholder='give Glucose' />
                <input type="text" onChange={onChange} name="BloodPressure" placeholder='give Blood Pressure' />
                <input type="text" onChange={onChange} name="SkinThickness" placeholder='give Skin thickness' />
                <input type="text" onChange={onChange} name="Insulin" placeholder='give Insulin' />
                <input type="text" onChange={onChange} name="BMI" placeholder='give BMI' />
                <input type="text" onChange={onChange} name="DiabetesPedigreeFunction" placeholder='give DiabetesPedigreeFunction' />
                <input type="text" onChange={onChange} name="Age" placeholder='give age' />
                <button type="submit">submit</button>
            </form>
        </Layout>
    )
}

export default DiabetesPredictor