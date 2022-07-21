const mongoose = require("mongoose");

const catalogSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
    },

    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],

    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

const Catalog = mongoose.model("Catalog", catalogSchema);

module.exports = Catalog;
