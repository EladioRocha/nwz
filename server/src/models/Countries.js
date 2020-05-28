const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true, minlength: 2, maxlength: 60},
    code: {type: String, required: true, minlength: 2, maxlength: 10},
    created_at: {type: Date, required: true, default: Date.now},
    updated_at: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Country', CountrySchema)