const express = require('express');
const { applyDoctorController, getAllNotificationController, deleteAllSeenNotificationController } = require('../controllers/doctorController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const router = express.Router();

router.post('/apply-doctor',AuthMiddleware, applyDoctorController);
router.post('/get-all-notification',AuthMiddleware, getAllNotificationController);
router.post('/delete-all-seen-notification',AuthMiddleware, deleteAllSeenNotificationController);



module.exports = router;
