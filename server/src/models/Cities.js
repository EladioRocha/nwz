const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    state_id: {type: mongoose.Types.ObjectId, required: true, ref: 'State'},
    name: {type: String, required: true, minlength: 2, maxlength: 60},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('City', CitySchema)