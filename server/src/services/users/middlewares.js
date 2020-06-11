const path = require('path'),
    validator = require('validator'),
    mongoose = require('mongoose'),
    moment = require('moment-timezone'),
    Book = require(path.join(__dirname, '..', '..', 'models', 'Books')),
    User = require(path.join(__dirname, '..', '..', 'models', 'Users')),
    Record = require(path.join(__dirname, '..', '..', 'models', 'Records')),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse'));

async function validBook(req, res, next) {
    try {
        const bookId = req.body.book;

        if(!validator.isMongoId(bookId)) {
            return handleResponse.response(res, 400, null, 'El libro seleccionado es invalido.')
        } else {
            const book = await Book.findOne({_id: mongoose.Types.ObjectId(bookId)}).select('borrowed user_id')
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
    const { days } = req.body
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

function isValidAccuser(req, res, next) {
    try {
        const accuser = req.body.accuser

        if(!validator.isMongoId(accuser)) {
            return handleResponse.response(res, 400, null, 'Lo siento parece ser que hay un error en tu reporte, pruebe intentandolo de nuevo.')
        }
        if(res.locals.data._id !== accuser) {
            return handleResponse.response(res, 400, null, 'Lo siento parece ser que hay un error en tu reporte, pruebe intentandolo de nuevo.')
        }

        const user = User.findOne({_id: mongoose.Types.ObjectId(accuser)}).select('_id')

        if(!user) {
            return handleResponse.response(res, 400, null, 'Lo siento parece ser que hay un error en tu reporte, pruebe intentandolo de nuevo.')
        }

        res.locals.report = {
            accuser
        }

        next()
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

function isValidAccused(req, res, next) {
    try {
        const accused = req.body.accused

        if(!validator.isMongoId(accused)) {
            return handleResponse.response(res, 400, null, 'El usuario al que deseas reportar no existe por favor intentelo nuevamente.')
        }

        const user = User.findOne({_id: mongoose.Types.ObjectId(accused)}).select('_id')

        if(!user) {
            return handleResponse.response(res, 400, null, 'El usuario al que deseas reportar no existe por favor intentelo nuevamente.')
        }

        res.locals.report.accused = accused

        next()
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function isValidReport(req, res, next) {
    try {
        const problem = req.body.problem.trim(' '),
            book = mongoose.Types.ObjectId(res.locals.data.book),
            accuser = mongoose.Types.ObjectId(res.locals.report.accuser),
            accused = mongoose.Types.ObjectId(res.locals.report.accused),
            currentDate = moment.tz('America/Mexico_City').format(),
            optionsLengthProblem = {min: 10, max: 255};

        if(!validator.isLength(problem, optionsLengthProblem)) {
            return handleResponse.response(res, 400, null, 'El cuerpo del problema es demasiado corto. Agregue un poco más de detalles.')
        }

        const record = await Record.findOne({
            book_id: book,
            start_date: {
                $lte: currentDate,
            },
            $or: [
                {
                    lender_id: accuser,
                    borrower_id: accused
                },
                {
                    lender_id: accused,
                    borrower_id: accuser
                }
            ],
        }).select('_id')

        if(!record) {
            return handleResponse.response(res, 400, null, 'Parece que no tienes ningún intercambio con el usuario ha reportar.')
        }
        
        res.locals.report.problem = problem
        next()
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}


module.exports = {
    validBook,
    borrowedBook,
    isFree,
    isValidDays,
    isDifferentUser,
    isValidAccuser,
    isValidAccused,
    isValidReport
}