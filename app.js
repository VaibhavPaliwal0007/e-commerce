const express = require('express');
require('./src/db/db');

const authRouter = require('./src/routes/authentication.js');
const sellerRouter = require('./src/routes/sellers.js');
const buyerRoute = require('./src/routes/buyer.js');

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/seller', sellerRouter);
app.use('/api/v1/buyer', buyerRoute);

app.get('*', (req, res) => {
    res.status(404).send({ error: 'Page not found' });
});

module.exports = app;