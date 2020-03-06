const mongoose = require('mongoose')
const shortid = require('shortid')

const URLSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortid.generate
    },
    views: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('URL', URLSchema)