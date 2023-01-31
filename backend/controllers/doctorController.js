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

module.exports = { getDoctorInfoController }