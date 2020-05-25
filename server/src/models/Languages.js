const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 50},
    code: {type: String, required: true, maxlength: 10},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Language', LanguageSchema)