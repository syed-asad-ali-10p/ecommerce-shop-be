const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    name: String,
    phone: Number
})

module.exports = mongoose.model('user', userSchema)