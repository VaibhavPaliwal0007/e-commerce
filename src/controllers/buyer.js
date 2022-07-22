const Seller = require("../models/Seller");
const Buyer = require("../models/Buyer");
const Catalog = require("../models/Catalog");

const pageOptions = {
    limit: 10,
    page: 1,
};

//do pagination
const getListOfSellers = async (req, res) => {
    try {
        //do pagination
        const sellers = await Seller.find({})
            .skip(pageOptions.limit * (pageOptions.page - 1))
            .limit(pageOptions.limit);

        res.status(200).json({ sellers });
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

module.exports = { getListOfSellers };
