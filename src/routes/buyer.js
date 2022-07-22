const buyerRoute = require('express').Router();

const { getListOfSellers } = require('../controllers/buyer');

buyerRoute.get('/list-of-sellers', getListOfSellers);

module.exports = buyerRoute;