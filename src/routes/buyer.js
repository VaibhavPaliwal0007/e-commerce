const buyerRoute = require("express").Router();

const { getListOfSellers, getCatalogBySellerId } = require("../controllers/buyer");
const auth = require("../middleware/auth");

buyerRoute.get("/list-of-sellers", auth, getListOfSellers);
buyerRoute.get("/seller-catalog/:sellerId", auth, getCatalogBySellerId);

module.exports = buyerRoute;
