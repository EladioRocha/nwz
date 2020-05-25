const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 60},
    code: {type: String, required: true, minlength: 2, maxlength: 10},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Country', CountrySchema)