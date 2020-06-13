const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender_id: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    chat_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Chat'},
    text: {type: String, required: true, minlength: 1},
    created_at: {type: Date, required: true, default: Date.now},
    updated_at: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Message', MessageSchema)