const Seller = require("../models/Seller");
const Catalog = require("../models/Catalog");
const Order = require("../models/Order");

const createCatalog = async (req, res) => {
    try {
        const items = req.body.items;
        const seller = await Seller.findById(req.user._id);

        if (!seller) {
            return res.status(404).send({ error: "Seller not found" });
        }

        if (seller.catalog) {
            return res.status(400).send({
                error: "Catalog already exists, Please update rather than creating!!",
            });
        }

        const catalog = new Catalog({
            owner: seller._id,
            products: items,
        });

        await catalog.save();
        seller.catalog = catalog._id;
        await seller.save();

        res.status(201).json({ catalog });
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

const getCatalog = async (req, res) => {
    try {
        const seller = req.user;

        if (!seller) {
            return res.status(404).send({ error: "Seller not found" });
        }

        await seller.populate("catalog");

        res.status(200).json({ catalog: seller.catalog });
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ seller: req.user._id });

        if (!orders) {
            return res.status(404).send({ error: "Orders not found" });
        }

        res.status(200).json({ orders });
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

module.exports = { createCatalog, getOrders, getCatalog };
