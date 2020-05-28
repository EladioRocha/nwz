const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 50},
    code: {type: String, maxlength: 10},
    created_at: {type: Date, required: true, default: Date.now},
    updated_at: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Language', LanguageSchema)