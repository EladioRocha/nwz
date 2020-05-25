const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    contry_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Country'},
    state_id: {type: mongoose.Types.ObjectId, required: true, ref: 'State'},
    city_id: {type: mongoose.Types.ObjectId, required: true, ref: 'City'},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Location', LocationSchema)