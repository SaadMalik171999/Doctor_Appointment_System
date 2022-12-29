const express = require('express');
const { loginController, registerController, authController } = require('../controllers/userController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const router = express.Router();

router.post('/login',loginController);

router.post('/register',registerController);
router.post('/getUserData',AuthMiddleware, authController);


module.exports = router;
