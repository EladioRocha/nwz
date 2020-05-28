const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 50},
    description: {type: String, minlength: 10, maxlength: 500},
    created_at: {type: Date, required: true, default: Date.now},
    updated_at: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Genre', GenreSchema)