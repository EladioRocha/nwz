const mongoose = require('mongoose');

const StatusReportsSchema = new mongoose.Schema({
    name: {type: String, required: true, maxlength: 50},
    description: {type: String, required: true, maxlength: 255},
    created_at: {type: Date, required: true, default: Date.now},
    updated_at: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('StatusReport', StatusReportsSchema)