const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    accuser_id: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    accused_id: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    book_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Book'},
    status_id: {type: mongoose.Types.ObjectId, required: true, ref: 'StatusReport'},
    problem: {type: String, required: true, minlength: 10, maxlength: 255},
    start_date: {type: Date, required: true},
    start_time: {type: String, required: true},
    created_at: {type: Date, required: true, default: Date.now},
    updated_at: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Report', ReportSchema)