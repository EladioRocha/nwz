const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    category_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Category'},
    language_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Language'}, 
    format_id: {type: mongoose.Types.ObjectId, ref: 'Format'},
    author_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Author'},
    user_id: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    title: {type: String, required: true, minlength: 2, maxlength: 255},
    isbn: {type: String, required: true, minlength: 2, maxlength: 12},
    number_pages: {type: String, required: true, maxlength: 6},
    publication_date: {type: Date, required: true},
    summary: {type: String, required: true, minlength: 10, maxlength: 1000},
    rank: [{
        user_id: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
        qualification: {type: Number, required: true, minlength: 1, maxlength: 5},
        createdAt: {type: Date, required: true, default: Date.now},
        updatedAt: {type: Date, required: true, default: Date.now}
    }],
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Book', BookSchema)