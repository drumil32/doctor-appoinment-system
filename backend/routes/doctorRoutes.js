const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const { getDoctorInfoController } = require('../controllers/doctorController');

// get single doc info
router.get('/getDoctorInfo', authMiddleware, getDoctorInfoController);

module.exports = router;