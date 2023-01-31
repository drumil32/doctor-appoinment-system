const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const { getDoctorInfoController, updateProfileController, getDoctorByIdController } = require('../controllers/doctorController');

// get single doc info
router.get('/getDoctorInfo', authMiddleware, getDoctorInfoController);
router.post('/updateProfile', authMiddleware, updateProfileController);
router.post('/getDoctorById', authMiddleware, getDoctorByIdController);

module.exports = router;