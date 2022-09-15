const express = require('express')

const userController = require('../controllers/user')
const router = express.Router();

// POST signup user
router.post('/signup', userController.signup)

// POST login user
router.post('/login', userController.login)

module.exports = router