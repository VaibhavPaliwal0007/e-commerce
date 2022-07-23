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

    order: [
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

orderSchema.methods.toJSON = function () {
    const order = this;

    const orderObject = order.toObject();

    delete orderObject.__v;
    delete orderObject.__id;
    
    return orderObject;
}

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
