const mongoose = require("mongoose");

const catalogSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
    },

    products: [
        {
            name:{
                type: String,
                required: true,

            },

            price: {
                type: Number,
                required: true,
            },
        }
    ],
});

const Catalog = mongoose.model("Catalog", catalogSchema);

module.exports = Catalog;
