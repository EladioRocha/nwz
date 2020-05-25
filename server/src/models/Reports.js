const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    accuser_id: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    accused_id: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    book_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Book'},
    problem: {type: Date, required: true},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Report', ReportSchema)