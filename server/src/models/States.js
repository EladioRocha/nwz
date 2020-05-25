const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
    contry_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Country'},
    name: {type: String, required: true, minlength: 2, maxlength: 60},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('State', StateSchema)