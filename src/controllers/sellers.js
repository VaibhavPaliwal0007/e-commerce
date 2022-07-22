const Seller = require("../models/Seller");
const Catalog = require("../models/Catalog");

const createCatalog = async (req, res) => {
    try {
        const items = req.body.items;
        const seller = await Seller.findById(req.user._id);

        if (!seller){
            return res.status(404).send({ error: "Seller not found" });
        }

        if(seller.catalog){
            return res.status(400).send({ error: "Catalog already exists, Please update rather than creating!!" });
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

module.exports = { createCatalog };
