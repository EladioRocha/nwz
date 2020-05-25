const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    lender_id: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    borrower_id: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    book_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Book'},
    message_date: {type: Date, required: true},
    message_time: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Chat', ChatSchema)