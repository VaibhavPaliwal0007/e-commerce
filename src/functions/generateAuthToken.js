const jwt = require("jsonwebtoken");

const generateToken = () => {
    return async function(){
        try {
            const user = this;
            const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
            
            user.tokens = user.tokens.concat({ token });
            await user.save();

            return token;

        } catch (error) {
            throw new Error(error);
        }
    };
};

module.exports = generateToken;
