const doctorModel = require("../models/doctorModels");

const getDoctorInfoController = async (req, res) => {
    try {
        console.log(req.body.userId)
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        console.log(doctor);
        res.status(200).send({
            success: true,
            message: 'doctor data fetch successfully',
            doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error in fetching doctor details'
        })
    }
}

const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate(
            { userId: req.body.userId },
            req.body
        );
        res.status(200).send({
            success: true,
            message: 'doctor data update successfully',
            doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'doctor profile update issue'
        })
    }
}

const getDoctorByIdController = async (req, res) => {
    try {
        console.log(req.body.doctorId);
        const doctor = await doctorModel.findById({ _id: req.body.doctorId });
        console.log(doctor);
        res.status(200).send({
            success: true,
            message: 'single doctor data fetch successfully',
            doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'doctor profile update issue'
        })
    }
}

module.exports = { getDoctorInfoController, updateProfileController, getDoctorByIdController }