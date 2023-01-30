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

// Auth || get
router.get('/getUserData', authMiddleware, getUserDataController);

// apply doctor || post
router.post('/apply-doctor', authMiddleware, applyDoctorController);

// notification Docotr || get
router.get('/get-all-notification', authMiddleware, getAllNotificationController);

// delete all notifications || delete
router.delete('/delete-all-notification', authMiddleware, deleteAllNotificationController);

module.exports = router;