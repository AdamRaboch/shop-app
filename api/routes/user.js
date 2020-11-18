const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { createUser, loginUser, deleteUser} = require('../controllers/users')
const auth = require('../middleware/auth')

router.post('/signup', createUser) 

router.post('/login', loginUser) 

router.delete('/:productId', auth, deleteUser) 


module.exports = router