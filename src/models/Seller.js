const mongoose = require('mongoose');
const validator = require('validator');

const sellerSchema = new mongoose.Schema({
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
        }
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
        }
    },

    catalog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalog',
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

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;