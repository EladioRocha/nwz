const mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate-v2');

const BookSchema = new mongoose.Schema({
    genre_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Genre'},
    language_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Language'}, 
    format_id: [{type: mongoose.Types.ObjectId, ref: 'Format'}],
    author_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Author'},
    user_id: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    title: {type: String, required: true, minlength: 2, maxlength: 255},
    isbn: {type: String,  minlength: 10, maxlength: 13},
    number_pages: {type: Number, required: true, min: 1, max: 10000},
    summary: {type: String, required: true, minlength: 10, maxlength: 1000},
    borrowed: {type: Boolean, required: true, default: false},
    read: {type: Number, required: true, default: 0},
    key: {type: String, required: true},
    rank: [{
        user_id: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
        qualification: {type: Number, required: true, min: 1, max: 5},
        created_at: {type: Date, required: true, default: Date.now},
        updated_at: {type: Date, required: true, default: Date.now}
    }],
    created_at: {type: Date, required: true, default: Date.now},
    updated_at: {type: Date, required: true, default: Date.now}
})

BookSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Book', BookSchema)