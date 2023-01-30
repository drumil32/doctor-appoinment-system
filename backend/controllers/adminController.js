const doctorModel = require('../models/doctorModels');
const userModel = require('../models/userModels');

const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({}, { password: 0 });
        res.status(200).send({
            success: true,
            message: 'users data',
            users
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
        const doctors = await doctorModel.find({}, { password: 0 });
        res.status(200).send({
            success: true,
            message: 'users data',
            doctors
        })
    } catch (error) {
        res.status(500).send({
            message: `error while fetching doctor list : ${error.message}`,
            success: false,
        });
    }
}

const changeAccountStatusController = async (req, res) => {
    try {
        const { doctorId, status } = req.body;
        console.log('from change staus')
        console.log(req.body)
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
        console.log(doctor)
        const user = await userModel.findById({ _id: doctor.userId });
        const notifications = user.notifications;
        notifications.push({
            type: 'doctor account status updated',
            message: `your doctor account has been ${status}`,
            onClickPath: `/notification`
        });
        user.isDoctor = status === 'approved' ? true : false;
        await user.save();
        res.status(201).send({
            success: true,
            message: `Account status updated`,
            data: doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `error while fetching doctor list : ${error.message}`,
            success: false,
        });
    }
}

module.exports = {
    getAllUsersController,
    getAllDoctorsController,
    changeAccountStatusController
}