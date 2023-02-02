const express = require('express');
const router = express.Router();

const {authorize} = require('../middleware/aurthorize')

const userController = require('../controllers/userController')
const auth = require('./auth')


router.get('/user', authorize, userController.getAllUser);
router.post('/user', userController.addUser);
router.put('/user/:id', authorize, userController.updateUser);
router.delete('/user/:id', authorize, userController.deleteUser);

router.use('/auth', auth)





module.exports = router