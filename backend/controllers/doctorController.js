const appointmentModel = require("../models/appointmentModels");
const doctorModel = require("../models/doctorModels");
const userModel = require("../models/userModels");

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

const getDoctorAppointmentsController = async (req, res) => {
    try {
        console.log(req.body.userId)
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        console.log(doctor);
        const appointments = await appointmentModel.find({ doctorId: doctor._id });

        console.log(appointments);
        res.status(200).send({
            success: true,
            message: 'appointments data fetched successfully',
            appointments
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

const updateAppointmentStatusController = async (req, res) => {
    try {
        const { appointmentId, status } = req.body;
        const appointment = await appointmentModel.findByIdAndUpdate(appointmentId, { status });
        const user = await userModel.findOne({ _id: appointment.userId });
        user.notifications.push({
            type: "status-update",
            message: `your appointment has been updated ${status}`,
            onClickPath: "/doctor-appointments"
        });
        await user.save();
        res.status(200).send({
            success: true,
            message: "appointment status updated"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'appintment status update issue'
        })
    }
}

module.exports = { getDoctorInfoController, updateProfileController, getDoctorByIdController, getDoctorAppointmentsController, updateAppointmentStatusController }