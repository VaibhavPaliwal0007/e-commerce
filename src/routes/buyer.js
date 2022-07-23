const buyerRoute = require("express").Router();

const { getListOfSellers, getCatalogBySellerId, createOrder } = require("../controllers/buyer");
const auth = require("../middleware/auth");

buyerRoute.get("/list-of-sellers", auth, getListOfSellers);
buyerRoute.get("/seller-catalog/:sellerId", auth, getCatalogBySellerId);
buyerRoute.post("/create-order/:sellerId", auth, createOrder);

module.exports = buyerRoute;
