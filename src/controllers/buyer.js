const Seller = require("../models/Seller");
const Buyer = require("../models/Buyer");
const Catalog = require("../models/Catalog");

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

module.exports = { getListOfSellers, getCatalogBySellerId };
