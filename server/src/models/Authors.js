const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 120},
    created_at: {type: Date, required: true, default: Date.now},
    updated_at: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Author', AuthorSchema)