const express = require('express');
const {
    loginController,
    registerController,
    getUserDataController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDoctorController,
    bookAppointmentController,
    bookingAvailabilityController,
    userAppointmentController
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// router object
const router = express.Router();

// ROUTES

// LOGIN || post
router.post('/login', loginController);

// REGISTER || post
router.post('/register', registerController);

// Auth || get
router.get('/getUserData', authMiddleware, getUserDataController);

// apply doctor || post
router.post('/apply-doctor', authMiddleware, applyDoctorController);

// notification Docotr || get
router.get('/get-all-notification', authMiddleware, getAllNotificationController);

// delete all notifications || delete
router.delete('/delete-all-notification', authMiddleware, deleteAllNotificationController);

// get all doctor
router.get('/getAllDoctor', authMiddleware, getAllDoctorController);

// book appointment
router.post('/book-appointment', authMiddleware, bookAppointmentController);

// booking avliability
router.post('/booking-avalibility', authMiddleware, bookingAvailabilityController);

router.get('/user-appointment', authMiddleware, userAppointmentController);

module.exports = router;