const mongoose = require('mongoose');

const FormatSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 50},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Format', FormatSchema)