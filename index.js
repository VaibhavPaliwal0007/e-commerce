const express = require('express');

require('dotenv').config();
require('./src/db/db');

const authRouter = require('./src/routes/authentication.js');
const sellerRouter = require('./src/routes/sellers.js');
const buyerRoute = require('./src/routes/buyer.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/seller', sellerRouter);
app.use('/api/v1/buyer', buyerRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
