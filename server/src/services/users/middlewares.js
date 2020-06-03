const path = require('path'),
    validator = require('validator'),
    mongoose = require('mongoose'),
    Book = require(path.join(__dirname, '..', '..', 'models', 'Books')),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse'));

async function validBook(req, res, next) {
    try {
        const bookId = req.body.book

        if(!validator.isMongoId(bookId)) {
            return handleResponse.response(res, 400, null, 'El libro seleccionado es invalido.')
        } else {
            const book = await Book.findOne({bookId: mongoose.Types.ObjectId(bookId)}).select('borrowed user_id')
            if(!book) {
                return handleResponse.response(res, 400, null, 'El libro seleccionado no existe.')
            }
            res.locals.data.book = bookId
            res.locals.data.userId = book.user_id
            res.locals.data.borrowed = book.borrowed
        }
        
        next()
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function validReport(req, res, next) {
    try {
        const problem = req.body.problem.trim(' '),
            optionsLengthProblem = {min: 10, max: 255};

        if(!validator.isLength(problem, optionsLengthProblem)) {
            return handleResponse.response(res, 400, null, 'El problema es demasiado corto.')
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
    isFree,
    validReport
}