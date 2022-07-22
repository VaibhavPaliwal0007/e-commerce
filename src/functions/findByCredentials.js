const bcrypt = require("bcrypt");

const Buyer = require("../models/Buyer");
const Seller = require("../models/Seller");

const findCredentials = () => {
    return async function (email, password) {
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
};

module.exports = findCredentials;