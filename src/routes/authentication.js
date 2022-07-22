const express = require('express');

const { register, login } = require('../controllers/authentication');
const auth = require('../middleware/auth');



const authRouter = new express.Router();

authRouter.post('/register', register);
authRouter.post('/login', auth, login);

module.exports = authRouter;