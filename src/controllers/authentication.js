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

const updateCredentials = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const model = req.user.constructor;

        console.log(model);

        const allowedUpdates = ["name", "email", "password", "phoneno"];

        const isValidOperation = updates.every((update) => {
            return allowedUpdates.includes(update);
        });

        if (!isValidOperation) {
            return res.status(400).send({ error: "Invalid updates" });
        }

        const user = await model.findById(req.user._id);

        updates.forEach((update) => {
            user[update] = req.body[update];
        });

        await user.save();
        res.send({ message: "Credentials updated successfully" });
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

const logout = async (req, res) => {
    try {
        req.user.tokens = req.author.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();
        res.send({ message: "Logged out successfully" });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

module.exports = { register, login, updateCredentials, logout };
