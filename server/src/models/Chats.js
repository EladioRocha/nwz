const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    user_1_id: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    user_2_id: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    book_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Book'},
    created_at: {type: Date, required: true, default: Date.now},
    updated_at: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Chat', ChatSchema)