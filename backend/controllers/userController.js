const userModel = require('../models/userModels');
const doctorModel = require('../models/doctorModels');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// login call back
const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            console.log(password);
            const isMatch = await bcrypt.compare(password, user.password);
            if (false === isMatch) {
                return res.status(200).send({
                    message: 'invalid credationals',
                    success: false
                });
            } else {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                return res.status(200).send({
                    message: 'Login successfully',
                    token,
                    success: true,
                });
            }
        } else {
            res.status(200).send({
                message: 'invalid credationals',
                success: false
            });
        }
    } catch (error) {
        res.status(500).send({
            message: `Login Controller : ${error.message}`,
            success: false,
        });
    }
}

// register call back
const registerController = async (req, res) => {
    try {
        const user = req.body;
        const checkUser = await userModel.findOne({ email: user.email });
        if (checkUser) {
            return res.status(200).send({
                message: 'User Already Exists',
                success: false
            });
        }
        user.password = await bcrypt.hash(user.password, 10);
        const newUser = new userModel(user);
        await newUser.save();
        res.status(200).send({
            message: 'register successfully',
            success: true
        })
    } catch (error) {
        res.status(500).send({
            message: `Register Controller : ${error.message}`,
            success: false,
        });
    }
}

const getUserDataController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        user.password = undefined;
        // delete user.password;
        // console.log(user)
        if (!user) {
            res.status(200).send({
                message: 'user not found',
                success: false
            });
        } else {
            res.status(200).send({
                user: user,
                success: true
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'some thing went wrong',
            success: false
        })
    }
}

const applyDoctorController = async (req, res) => {
    try {
        const user = req.body;
        const checkDoctor = await doctorModel.findOne({ $or: [{ userId: req.body.userId }, { email: user.email }, { phone: user.phone }] });
        if (checkDoctor) {
            var message = '';
            if (checkDoctor.userId === req.body.userId) {
                if (checkDoctor.status === 'approved')
                    message = 'your request is already accepted';
                else
                    message = 'you are already applied';
            } else {
                message = 'emailid and contact number is already exists please give unique one'
            }
            return res.status(200).send({
                message: message,
                success: false
            });
        } else {
            const checkUser = await userModel.findOne({ _id: req.body.userId, isDoctor: true });
            if (checkUser) {
                return res.status(200).send({
                    message: `user's application is already accepted`,
                    success: false
                });
            } else {
                const newDoctor = new doctorModel(user);
                const obj = await newDoctor.save();
                console.log(obj)
                const adminUser = await userModel.findOne({ isAdmin: true });
                console.log(adminUser)
                const notifications = adminUser.notifications;
                notifications.push({
                    type: 'apply-doctor-request',
                    message: `${newDoctor.firstName} ${newDoctor.lastName}`,
                    data: {
                        doctorId: newDoctor._id,
                        name: newDoctor.firstName + " " + newDoctor.lastName,
                        onClickPath: '/admin/doctors'
                    }
                });
                await userModel.findByIdAndUpdate(adminUser._id, { notifications });
                res.status(201).send({
                    success: true,
                    message: 'Doctor acount applied successfully'
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error while applying for doctor'
        })
    }
}

const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        const seennotifications = user.seennotifications;
        const notifications = user.notifications;
        seennotifications.push(...notifications);
        user.seennotifications = notifications;
        user.notifications = []
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: 'all notifactions marked as read',
            user: updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error while fetching notifications'
        })
    }
}

const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        user.seennotifications = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: 'all notifactions marked as read',
            user: updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error while fetching notifications'
        })
    }
}

const getAllDoctorController = async (req, res) => {
    try {
        const doctorList = await doctorModel.find({ status: 'approved' });
        res.status(200).send({
            success: true,
            message: 'doctor list fetched successfully',
            doctorList
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error while fetching notifications'
        })
    }
}

const bookAppointmentController = async (req, res) => {

}

module.exports = {
    loginController,
    registerController,
    getUserDataController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDoctorController,
    bookAppointmentController
}