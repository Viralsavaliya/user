const express = require('express');
const router = express.Router();

const authcontroller = require('../controllers/authController')



router.post('/register', authcontroller.register);
router.post('/login', authcontroller.login);
// router.get('/forget-password', authcontroller.forgetpassword)
router.post('/forget-password', authcontroller.sendEmail)



router.post('/reset-password', authcontroller.resetpassword)



module.exports = router