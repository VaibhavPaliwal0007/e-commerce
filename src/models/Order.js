const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buyer",
    },

    seller: {
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

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
