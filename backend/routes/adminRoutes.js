const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllDoctorsController, getAllUsersController } = require('../controllers/adminController')

const router = express.Router();

router.get('/getAllUsers', authMiddleware, getAllUsersController);
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

module.exports = router;