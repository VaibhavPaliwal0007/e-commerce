const express = require('express');

const { register, login, updateCredentials, logout } = require('../controllers/authentication');
const auth = require('../middleware/auth');

const authRouter = new express.Router();

authRouter.post('/register', register);
authRouter.post('/login', auth, login);
authRouter.patch('/update-credentials', auth, updateCredentials);
authRouter.post('/logout', auth, logout);

module.exports = authRouter;