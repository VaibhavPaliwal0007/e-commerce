const express = require('express');
const sellerRoute = new express.Router();

const { createCatalog, getOrders, getCatalog } = require('../controllers/sellers');
const auth = require('../middleware/auth');

sellerRoute.post('/create-catalog', auth, createCatalog);
sellerRoute.get('/orders', auth, getOrders);
sellerRoute.get('/catalog', auth, getCatalog);

module.exports = sellerRoute;