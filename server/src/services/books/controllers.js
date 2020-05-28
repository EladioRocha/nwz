const path = require('path'),
    mongoose = require('mongoose'),
    Book = require(path.join(__dirname, '..', '..', 'models', 'Books')),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse'));

async function getBooks(req, res) {
    try {
        const books = await Book.find({}).populate('format_id genre_id', 'name').select('title genre_id format_id borrowed').limit(16)
        return handleResponse.response(res, 200, books)
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function getBook(req, res) {
    try {
        const _id = mongoose.Types.ObjectId(req.params._id)
        console.log(req.params)
        const book = await Book.findOne({_id})
            .populate('author_id genre_id language_id format_id user_id', 'name')
            .populate('user_id', 'username')
            .select('title genre_id language_id format_id user_id number_pages publication_date isbn summary rank borrowed')
        return handleResponse.response(res, 200, book)
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function saveBook(req, res) {
    try {
        await Book.create(res.locals.data)
        return handleResponse.response(res, 200, null, 'El libro se ha guardado correctamente.')
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function updateRankBook(req, res) {
    try {
        const {_id, user_id, qualification} = res.locals.data
        await Book.bulkWrite([
            {
                updateOne: {
                    filter: {'rank.user_id': user_id},
                    update: {$set: {'rank.$.qualification': qualification}}
                }
            },
            {
                updateOne: {
                    filter: {'rank.user_id': {$ne: user_id}},
                    update: {$push: {'rank': {user_id, qualification}}}
                }
            }
        ])

        return handleResponse.response(res, 200, null, 'La calificación se ha actualizado exitosamente.')
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

module.exports = {
    getBooks,
    getBook,
    saveBook,
    updateRankBook
}