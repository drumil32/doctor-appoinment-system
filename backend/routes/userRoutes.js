const express = require('express');
const {
    loginController,
    registerController,
    getUserDataController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// router object
const router = express.Router();

// ROUTES

// LOGIN || post
router.post('/login', loginController);

// REGISTER || post
router.post('/register', registerController);

// Auth || post
router.get('/getUserData', authMiddleware, getUserDataController);

// apply doctor || post
router.post('/apply-doctor', authMiddleware, applyDoctorController);

// notification Docotr || post
router.get('/get-all-notification', authMiddleware, getAllNotificationController);

router.delete('/delete-all-notification', authMiddleware, deleteAllNotificationController);

module.exports = router;