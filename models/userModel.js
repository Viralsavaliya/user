const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    login_token: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

const user = mongoose.model('user', userSchema);

module.exports = user