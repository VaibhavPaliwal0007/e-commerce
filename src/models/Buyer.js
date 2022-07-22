const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

require("dotenv").config();

const generateToken = require("../functions/generateAuthToken");

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

buyerSchema.methods.generateAuthToken = generateToken();

buyerSchema.statics.findByCredentials = async function (email, password) {
    try {
        const user = await this.findOne({ email });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        return user;
    } catch (e) {
        throw new Error(e);
    }
};

buyerSchema.pre("save", async function (next) {
    const buyer = this;

    if (buyer.isModified("password")) {
        buyer.password = await bcrypt.hash(buyer.password, 8);
    }

    next();
});

const Buyer = mongoose.model("Buyer", buyerSchema);

module.exports = Buyer;
