const express = require('express');
const sellerRoute = new express.Router();

const { createCatalog } = require('../controllers/sellers');
const auth = require('../middleware/auth');

sellerRoute.post('/create-catalog', auth, createCatalog);

module.exports = sellerRoute;