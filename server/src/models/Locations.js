const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    country_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Country'},
    state_id: {type: mongoose.Types.ObjectId, required: true, ref: 'State'},
    city_id: {type: mongoose.Types.ObjectId, required: true, ref: 'City'},
    created_at: {type: Date, required: true, default: Date.now},
    updated_at: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Location', LocationSchema)