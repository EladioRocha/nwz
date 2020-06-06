const path = require('path'),
    validator = require('validator'),
    mongoose = require('mongoose'),
    Book = require(path.join(__dirname, '..', '..', 'models', 'Books')),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse'));

async function validBook(req, res, next) {
    try {
        console.log(req.body)
        const bookId = req.body.book;

        if(!validator.isMongoId(bookId)) {
            return handleResponse.response(res, 400, null, 'El libro seleccionado es invalido.')
        } else {
            const book = await Book.findOne({_id: mongoose.Types.ObjectId(bookId)}).select('borrowed user_id')
            console.log(book)
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
        return handleResponse.response(res, 400, null, 'El libro seleccionado ya se encuentra en prestamo por otro usuario.')
    }

    next()
}

function isFree(req, res, next) {
    if(!res.locals.data.borrowed) {
        return handleResponse.response(res, 400, null, 'El libro no esta disponible en estos momentos.')
    }

    next()
}

function isValidDays(req, res, next) {
    const { days } = req.body.days
    if(days < 1 || days > 7) {
        return handleResponse.response(res, 400, null, 'Los días ingresados no son validos, ingrese un valor valido.')
    }
    
    res.locals.data.days = days

    next()
}

function isDifferentUser(req, res, next) {
    const {_id, userId} = res.locals.data
    if(_id.toString() === userId.toString()) {
        return handleResponse.response(res, 400, null, 'No puedes prestar el libro de forma física a ti mismo.')
    }

    next()
}

module.exports = {
    validBook,
    borrowedBook,
    isFree,
    isValidDays,
    validReport,
    isDifferentUser
}