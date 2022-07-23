const Seller = require("../models/Seller");
const Buyer = require("../models/Buyer");
const Catalog = require("../models/Catalog");
const Order = require("../models/Order");

const pageOptions = {
    limit: 10,
    page: 1,
};

const getListOfSellers = async (req, res) => {
    try {
        const sellers = await Seller.find({})
            .skip(pageOptions.limit * (pageOptions.page - 1))
            .limit(pageOptions.limit);

        res.status(200).json({ sellers });
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

const getCatalogBySellerId = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;

        if (!sellerId) {
            return res.status(400).send("Seller id is required");
        }

        const catalog = await Catalog.find({ owner: sellerId });
        res.status(200).json({ catalog });
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

const createOrder = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const buyerId = req.user._id;
        const order = req.body.items;

        if (!sellerId) {
            return res.status(400).send("Seller id is required");
        }

        const catalog = await Catalog.findOne({ owner: sellerId });

        if (!catalog) {
            return res.status(400).send("Catalog not found");
        }

        for (let i = 0; i < order.length; i++) {
            const item = catalog.products.find(
                (item) => item.name === order[i].name
            );

            if (!item) {
                return res.status(400).send("Item not found");
            }
        }

        const newOrder = new Order({
            buyer: buyerId,
            seller: sellerId,
            order: order,
        });

        await newOrder.save();

        res.status(200).send("Order created");
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

module.exports = { getListOfSellers, getCatalogBySellerId, createOrder };
