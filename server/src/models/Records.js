const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    lender_id: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    borrower_id: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    book_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Book'},
    start_date: {type: Date, required: true},
    start_time: {type: String, required: true},
    end_date: {type: Date, required: true},
    end_time: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Record', RecordSchema)