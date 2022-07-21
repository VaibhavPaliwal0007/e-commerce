const mongoose = require("mongoose");
const validator = require("validator");

const buyerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
    },

    password: {
        type: String,
        required: true,
    },

    phoneno: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error("Phone number is invalid");
            }
        },
    },

    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

const Buyer = mongoose.model("Buyer", buyerSchema);

module.exports = Buyer;
