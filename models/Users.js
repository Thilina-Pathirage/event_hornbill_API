const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    pwd: {
        type: String,
        required: false,
    }
});

const User = mongoose.model("user", UserSchema)
module.exports = User;
