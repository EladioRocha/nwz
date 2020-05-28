const path = require('path'),
    jwt = require('jsonwebtoken'),
    validator = require('validator'),
    moment = require('moment'),
    mongoose = require('mongoose'),
    Genre = require(path.join(__dirname, '..', '..', 'models', 'Genres')),
    Language = require(path.join(__dirname, '..', '..', 'models', 'Languages')),
    Format = require(path.join(__dirname, '..', '..', 'models', 'Formats')),
    Author = require(path.join(__dirname, '..', '..', 'models', 'Authors')),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse'));

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
            return handleResponse.response(res, 400, null, 'El título es muy corto.')
        }
        if(!validator.isLength(isbn, optionsLengthIsbn)) {
            return handleResponse.response(res, 400, null, 'El ISBN es muy largo.')
        }
        if((numPages < 1 || numPages > 10000)) {
            return handleResponse.response(res, 400, null, 'El número de página ingresado es invalido.')
        }
        if(!moment(publicationDate).isValid()) {
            return handleResponse.response(res, 400, null, 'La fecha de publicación ingresada es invalida.')
        }
        if(!validator.isLength(summary, optionsLenghtSummary)) {
            return handleResponse.response(res, 400, null, 'El resumen ingresado es invalido.')
        }
        if(!validator.isLength(author, optionsLengthAuthor)) {
            return handleResponse.response(res, 400, null, 'El nombre del autor ingresado es muy corto.')
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
            return handleResponse.response(res, 400, null, 'El género ingresado es invalido.')
        } 
        if(!languageDB) {
            return handleResponse.response(res, 400, null, 'El idioma ingresado es invalido.')
        }
        if(!isValidFormat(formats, formatsDB)) {
            return handleResponse.response(res, 400, null, 'Formato ingresado invalido.')
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
        return handleResponse.response(res, 500, null)
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

async function validQualificationBook(req, res, next) {
    try {
        const qualification = parseInt(req.body.qualification),
            _id = mongoose.Types.ObjectId(req.body.book);

        if(qualification < 1 || qualification > 5) {
            return handleResponse.response(res, 400, null, 'El score asignado es invalido.')
        }

        res.locals.data = {
            user_id: mongoose.Types.ObjectId(res.locals.data._id),
            qualification,
            _id
        }

        next()
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

module.exports = {
    validDataBook,
    validQualificationBook
}