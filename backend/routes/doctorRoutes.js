const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const { getDoctorInfoController, updateProfileController, getDoctorByIdController, getDoctorAppointmentsController, updateAppointmentStatusController } = require('../controllers/doctorController');

// get single doc info
router.get('/getDoctorInfo', authMiddleware, getDoctorInfoController);
router.post('/updateProfile', authMiddleware, updateProfileController);
router.post('/getDoctorById', authMiddleware, getDoctorByIdController);
router.get('/doctor-appointments', authMiddleware, getDoctorAppointmentsController);
router.post('/update-appointment-status', authMiddleware, updateAppointmentStatusController);

module.exports = router;