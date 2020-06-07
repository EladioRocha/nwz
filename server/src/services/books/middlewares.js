const path = require('path'),
    validator = require('validator'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    moment = require('moment-timezone'),
    pdf2png = require('pdf2png-mp'),
    hummus = require('hummus'),
    streams = require('memory-streams'),
    PDFRStreamForBuffer = require(path.join(__dirname, '..', '..', 'helpers', 'PDFRStreamForBuffer'))
    Genre = require(path.join(__dirname, '..', '..', 'models', 'Genres')),
    Language = require(path.join(__dirname, '..', '..', 'models', 'Languages')),
    Format = require(path.join(__dirname, '..', '..', 'models', 'Formats')),
    Author = require(path.join(__dirname, '..', '..', 'models', 'Authors')),
    Record = require(path.join(__dirname, '..', '..', 'models', 'Records')),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse'));

async function validDataBook(req, res, next) {
    try {
        const genre = req.body.genre.trim(' '),
            language = req.body.language.trim(' '),
            formats = req.body.format.map(str => str.trim(' ')),
            author = req.body.author.trim(' '),
            title = req.body.title.trim(' '),
            numPages = req.body.numPages,
            summary = req.body.summary.trim(' '),
            userId = res.locals.data._id,
            optionsLengthAuthor = { min: 2, max: 120 },
            optionsLenghtTitle = { min: 2, max: 255 },
            optionsLengthIsbn = { min: 10, max: 13 },
            optionsLenghtSummary = { min: 10, max: 1000 };
        let isbn = req.body.isbn.trim(' ')

        if (!validator.isLength(title, optionsLenghtTitle)) {
            return handleResponse.response(res, 400, null, 'El título es muy corto.')
        }
        if (!validator.isLength(isbn, optionsLengthIsbn) && isbn !== '') {
            return handleResponse.response(res, 400, null, 'El ISBN es invalido, puedes omitir este campo.')
        } else if(isbn === '') {
            isbn = '0000000000000'
        }
        if ((numPages < 1 || numPages > 10000)) {
            return handleResponse.response(res, 400, null, 'El número de página ingresado es invalido.')
        }
        if (!validator.isLength(summary, optionsLenghtSummary)) {
            return handleResponse.response(res, 400, null, 'El resumen ingresado es invalido.')
        }
        if (!validator.isLength(author, optionsLengthAuthor)) {
            return handleResponse.response(res, 400, null, 'El nombre del autor ingresado es muy corto.')
        }

        const genreDB = await Genre.findOne({ _id: mongoose.Types.ObjectId(genre) }).select('name'),
            languageDB = await Language.findOne({ _id: mongoose.Types.ObjectId(language) }).select('name'),
            formatsDB = await Format.find({}).select('name'),
            authorDB = await Author.findOneAndUpdate(
                { name: author },
                { $setOnInsert: { name: author } },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            ).select('name');

        if (!genreDB) {
            return handleResponse.response(res, 400, null, 'El género ingresado es invalido.')
        }
        if (!languageDB) {
            return handleResponse.response(res, 400, null, 'El idioma ingresado es invalido.')
        }
        if (!isValidFormat(formats, formatsDB)) {
            return handleResponse.response(res, 400, null, 'Formato ingresado invalido.')
        }

        res.locals.data = {
            genre_id: mongoose.Types.ObjectId(genreDB._id),
            language_id: mongoose.Types.ObjectId(languageDB._id),
            format_id: formats.pop(),
            author_id: mongoose.Types.ObjectId(authorDB._id),
            user_id: mongoose.Types.ObjectId(userId),
            title,
            isbn,
            number_pages: numPages,
            summary
        }

        next()
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function userHasBook(req, res, next) {
    try {
        const borrowerId = mongoose.Types.ObjectId(res.locals.data._id),
            bookId = mongoose.Types.ObjectId(req.params.id),
            currentDate = moment.tz('America/Mexico_City').format();

        const data = await Record.findOne({
            borrower_id: borrowerId, 
            book_id: bookId,
            end_date: {$gt: currentDate}
        }).select('_id')
        if(!data) {
            return handleResponse.response(res, 400, null, 'El libro no te pertenece solicita el libro para poder leerlo.')
        }

        res.locals.data.book = bookId
        next()
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

function isValidFormat(formats, formatsDB) {
    let validFormat = false,
        data = [];

    for (let format of formats) {
        for (let formatDB of formatsDB) {
            if (format === formatDB._id.toString()) {
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

        if (qualification < 1 || qualification > 5) {
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

async function isValidPdf(req, res, next) {
    try {
        const fileBuffer = decodeBase64File(res, req.body.book),
            filename = moment().unix();
            pathPDF = path.join(__dirname, '..', '..', 'temp', 'books', 'pdf', `${filename}.pdf`)
            pathCoverPDF = path.join(__dirname, '..', '..', 'temp', 'books', 'pdf', 'covers', `${filename}.pdf`)
        await fs.writeFileSync(pathPDF, fileBuffer.data)
        
        try {
            let firstPageBuffer = getFirstPagePDF(fs.readFileSync(pathPDF));
            fs.writeFileSync(pathCoverPDF, firstPageBuffer);
            const pathImg = await getImageFromPDF(filename, pathCoverPDF)
            res.locals.data.filename = filename
            res.locals.book = {
                pdf: pathPDF,
                img: pathImg,
                pdfCover: pathCoverPDF,
                filename
            }
            next()
        } catch (error) {
            console.log(error)
            return handleResponse.response(res, 400, null, 'El tipo de archivo no es valido.')
        }

    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

function decodeBase64File(res, dataString) {
    const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return handleResponse.response(res, 400, null, 'El tipo de archivo no es valido.')
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

function getImageFromPDF(filename, pathPDF) {
    return new Promise((resolve, reject) => {
        try {
            const pathImg = path.join(__dirname, '..', '..', 'temp', 'images', `${filename}.png`)
            pdf2png.convert(pathPDF, function(resp){
                if(!resp.success) {
                    console.log("Something went wrong: " + resp.error);
                    reject(true)                    
                }

                fs.writeFile(pathImg, resp.data[1], function(err) {
                    if(err) {
                        console.log(err);
                        reject(true)                    
                    }
                    else {
                        resolve(pathImg)
                    }
                });
            });
    
        } catch (error) {
            console.log(error)
            reject(true)
        }
    })
}

function getFirstPagePDF (buffer) {
    //Creating a stream, so hummus pushes the result to it
    let outStream = new streams.WritableStream();
    //Using PDFStreamForResponse to be able to pass a writable stream
    let pdfWriter = hummus.createWriter(new hummus.PDFStreamForResponse(outStream));

    //Using our custom PDFRStreamForBuffer adapter so we are able to read from buffer
    let copyingContext = pdfWriter.createPDFCopyingContext(new PDFRStreamForBuffer(buffer));
    //Get the first page.
    copyingContext.appendPDFPageFromPDF(0);

    //We need to call this as per docs/lib examples
    pdfWriter.end();

    //Here is a nuance.
    //HummusJS does it's work SYNCHRONOUSLY. This means that by this line
    //everything is written to our stream. So we can safely run .end() on our stream.
    outStream.end();

    //As we used 'memory-stream' and our stream is ended
    //we can just grab stream's content and return it
    return outStream.toBuffer();
}

module.exports = {
    validDataBook,
    validQualificationBook,
    isValidPdf,
    userHasBook
}