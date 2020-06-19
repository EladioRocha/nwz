const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    lender_id: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    borrower_id: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    book_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Book'},
    format_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Format'},
    page: {type: Number, required: true, default: 1},
    start_date: {type: Date, required: true},
    start_time: {type: String, required: true},
    end_date: {type: Date, required: true},
    end_time: {type: String, required: true},
    created_at: {type: Date, required: true, default: Date.now},
    updated_at: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Record', RecordSchema)