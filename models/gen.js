const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const data = new Schema({
    name: String
})

module.exports = mongoose.model('Genre', data)