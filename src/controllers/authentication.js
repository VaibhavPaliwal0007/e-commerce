const Buyer = require("../models/Buyer");
const Seller = require("../models/Seller");

const register = async (req, res) => {
    try {
        let { name, email, password, phoneno, role } = req.body;

        role = role.toLowerCase().trim();

        const model = role === "buyer" ? Buyer : Seller;

        if (role !== "buyer" && role !== "seller") {
            return res.status(400).send("Invalid role");
        }

        const alreadyRegisteredUser = await model.findOne({ email });

        if (alreadyRegisteredUser) {
            return res.status(400).send("User already registered");
        }

        const user = await model.create({
            name,
            email,
            password,
            phoneno,
        });
        const token = user.generateAuthToken();

        res.send({ user, token });
    } catch (e) {
        res.status(400).send({ e });
        console.log(e);
    }
};

const login = async (req, res) => {
    try {
        let { email, password, role } = req.body;

        role = role.toLowerCase().trim();

        if (role != "buyer" && role != "seller") {
            throw new Error("Invalid role");
        }

        const user = await (role === "buyer"
            ? Buyer
            : Seller
        ).findByCredentials(email, password);
        const token = await user.generateAuthToken();

        res.status(200).send(token);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

module.exports = { register, login };
