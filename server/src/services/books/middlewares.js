const path = require('path'),
    jwt = require('jsonwebtoken'),
    validator = require('validator'),
    moment = require('moment'),
    mongoose = require('mongoose'),
    Genre = require(path.join(__dirname, '..', '..', 'models', 'Genres')),
    Language = require(path.join(__dirname, '..', '..', 'models', 'Languages')),
    Format = require(path.join(__dirname, '..', '..', 'models', 'Formats')),
    Author = require(path.join(__dirname, '..', '..', 'models', 'Authors'));


async function validToken(req, res, next) {
    try {
        const token = getToken(req.headers.authorization)
        if(!validator.isJWT(token)) {
            return res.status(400).json({data: {message: 'El token enviado es invalido.', status: 400, statusText: 'Bad Request'}})
        }
        const {data} = jwt.verify(token, process.env.JWT_SECRET_KEY)
        res.locals.data = data

        next()
    } catch (error) {
        return res.status(403).json({data: {message: 'No tienes una sesión activa, inicie sesión para continuar.', status: 403, statusText: 'Forbidden'}})
    }
}

function getToken(header) {
    return header.split(' ').pop()
}

async function validDataBook(req, res, next) {
    try {
        const genre = req.body.genre.trim(' '),
            language = req.body.language.trim(' '),
            formats = req.body.format.map(str => str.trim(' ')),
            author = req.body.author.trim(' '),
            title = req.body.title.trim(' '),
            isbn = req.body.isbn.trim(' '),
            numPages = req.body.number_pages,
            publicationDate = moment(req.body.publication_date.trim(' '), 'DD-MM-YYYY').toDate(),
            summary = req.body.summary.trim(' '),
            userId = res.locals.data._id,
            optionsLengthAuthor = {min: 2, max: 120},
            optionsLenghtTitle = {min: 2, max: 255},
            optionsLengthIsbn = {min: 0, max: 15},
            optionsLenghtSummary = {min: 10, max: 1000};

        if(!validator.isLength(title, optionsLenghtTitle)) {
            return res.status(400).json({data: {message: 'El título es muy corto.', status: 400, statusText: 'Bad Request'}})
        }
        if(!validator.isLength(isbn, optionsLengthIsbn)) {
            return res.status(400).json({data: {message: 'El ISBN es muy largo.', status: 400, statusText: 'Bad Request'}})
        }
        if((numPages < 1 || numPages > 10000)) {
            return res.status(400).json({data: {message: 'El número de página ingresado es invalido.', status: 400, statusText: 'Bad Request'}})
        }
        if(!moment(publicationDate).isValid()) {
            return res.status(400).json({data: {message: 'La fecha de publicación ingresada es invalida.', status: 400, statusText: 'Bad Request'}})
        }
        if(!validator.isLength(summary, optionsLenghtSummary)) {
            return res.status(400).json({data: {message: 'El resumen ingresado es invalido.', status: 400, statusText: 'Bad Request'}})
        }
        if(!validator.isLength(author, optionsLengthAuthor)) {
            return res.status(400).json({data: {message: 'El nombre del autor ingresado es muy corto.', status: 400, statusText: 'Bad Request'}})
        }

        const genreDB = await Genre.findOne({name: genre}).select('name'),
            languageDB = await Language.findOne({name: language}).select('name'),
            formatsDB = await Format.find({}).select('name'),
            authorDB = await Author.findOneAndUpdate(
                {name: author},
                {$setOnInsert: {name: author}},
                {upsert: true, new: true, setDefaultsOnInsert: true}
            ).select('name');
        
        if(!genreDB) {
            return res.status(400).json({data: {message: 'El género ingresado es invalido.', status: 400, statusText: 'Bad Request'}})
        } 
        if(!languageDB) {
            return res.status(400).json({data: {message: 'El idioma ingresado es invalido.', status: 400, statusText: 'Bad Request'}})
        }
        if(!isValidFormat(formats, formatsDB)) {
            return res.status(400).json({data: {message: 'Formato ingresado invalido.', status: 400, statusText: 'Bad Request'}})
        }
        res.locals.data = {
            genre_id: genreDB._id,
            language_id: languageDB._id,
            format_id: formats.pop(),
            author_id: authorDB._id,
            user_id: mongoose.Types.ObjectId(userId),
            title,
            isbn,
            number_pages: numPages,
            publication_date: publicationDate,
            summary
        }

        next()
    } catch (error) {
        console.log(error)
        res.json('error') 
    }
}

function isValidFormat(formats, formatsDB) {
    let validFormat = false,
        data = [];

    for(let format of formats) {
        for(let formatDB of formatsDB) {
            if(format === formatDB.name) {
                data.push(formatDB._id)
                validFormat = true
                break
            }

            validFormat = false
        }
    }
    formats.push(data) // Added _ids by reference
    return validFormat
}

module.exports = {
    validToken,
    validDataBook
}