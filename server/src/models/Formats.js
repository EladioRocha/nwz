const mongoose = require('mongoose');

const FormatSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 50},
    created_at: {type: Date, required: true, default: Date.now},
    updated_at: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Format', FormatSchema)