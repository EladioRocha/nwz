const path = require('path'),
    validator = require('validator'),
    mongoose = require('mongoose'),
    Book = require(path.join(__dirname, '..', '..', 'models', 'Books')),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse'));

async function validBook(req, res, next) {
    try {
        const _id = req.body.book

        if(!validator.isMongoId(_id)) {
            return handleResponse.response(res, 400, null, 'El libro seleccionado es invalido.')
        } else {
            const book = await Book.findOne({_id: mongoose.Types.ObjectId(_id)}).select('borrowed user_id')
            if(!book) {
                return handleResponse.response(res, 400, null, 'El libro seleccionado no existe.')
            }
            res.locals.data.book = _id
            res.locals.data.userId = book.user_id
            res.locals.data.borrowed = book.borrowed
        }
        
        next()
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

function borrowedBook(req, res, next) {
    if(res.locals.data.borrowed) {
        return handleResponse.response(res, 400, null, 'El libro seleccionado ya se encuentra usado por otro usuario.')
    }

    next()
}

function isFree(req, res, next) {
    if(!res.locals.data.borrowed) {
        return handleResponse.response(res, 400, null, 'El libro no se encuentra en prestamo.')
    }

    next()
}


module.exports = {
    validBook,
    borrowedBook,
    isFree
}