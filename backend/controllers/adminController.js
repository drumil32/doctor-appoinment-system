const doctorModel = require('../models/doctorModels');
const userModel = require('../models/userModels');

const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).send({
            success: true,
            message: 'users data',
            data: users
        })
    } catch (error) {
        res.status(500).send({
            message: `error while fetching users list : ${error.message}`,
            success: false,
        });
    }
}

const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        res.status(200).send({
            success: true,
            message: 'users data',
            data: doctors
        })
    } catch (error) {
        res.status(500).send({
            message: `error while fetching doctor list : ${error.message}`,
            success: false,
        });
    }
}

module.exports = {
    getAllUsersController,
    getAllDoctorsController
}