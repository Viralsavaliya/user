const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const randToken = require('rand-token')

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
    }
}, {
    timestamps: true
})

const user = mongoose.model('user', userSchema);

module.exports = user