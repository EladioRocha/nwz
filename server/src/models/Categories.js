const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 50},
    description: {type: String, required: true, minlength: 10, maxlength: 500},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Category', CategorySchema)