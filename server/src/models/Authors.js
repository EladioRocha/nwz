const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    firstname: {type: String, required: true, minlength: 2, maxlength: 60},
    lastname: {type: String, required: true, minlength: 2, maxlength: 60},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Author', AuthorSchema)