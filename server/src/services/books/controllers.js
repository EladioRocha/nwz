const path = require('path'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    moment = require('moment-timezone'),
    Book = require(path.join(__dirname, '..', '..', 'models', 'Books')),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse')),
    uploadFile = require(path.join(__dirname, '..', '..', 'helpers', 'uploadFileToAWS'));

async function getBooks(req, res) {
    try {
        const page = req.query.page,
            genre = req.query.genre,
            offset = page ? parseInt(page - 1) * process.env.BOOKS_PER_PAGE : 0,
            options = {
                offset,
                limit: process.env.BOOKS_PER_PAGE,
                select: 'title genre_id format_id borrowed filename',
                populate: {
                    path: 'genre_id format_id',
                    select: '_id name'
                }
            }

        let data
        if (genre !== 'All') {
            data = await Book.paginate({ genre_id: mongoose.Types.ObjectId(genre) }, options)
        } else {
            data = await Book.paginate({}, options)
        }

        const book = data.docs;
        book.push({ totalPages: data.totalPages, page: data.page })
        console.log(book)
        return handleResponse.response(res, 200, book)
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function getBook(req, res) {
    try {
        const _id = mongoose.Types.ObjectId(req.params._id)
        const book = await Book.aggregate([
            { $match: { _id } },
            {
                $lookup: {
                    from: 'authors',
                    localField: 'author_id',
                    foreignField: '_id',
                    as: 'author_id'
                }
            },
            {
                $lookup: {
                    from: 'formats',
                    localField: 'format_id',
                    foreignField: '_id',
                    as: 'format_id'
                }
            },
            {
                $lookup: {
                    from: 'genres',
                    localField: 'genre_id',
                    foreignField: '_id',
                    as: 'genre_id'
                }
            },
            {
                $lookup: {
                    from: 'languages',
                    localField: 'language_id',
                    foreignField: '_id',
                    as: 'language_id'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user_id'
                }
            },
            { $unwind: '$author_id' },
            { $unwind: '$genre_id' },
            { $unwind: '$language_id' },
            { $unwind: '$user_id' },
            {
                $addFields: {
                    rank: { $avg: '$rank.qualification' },
                }
            },
            {
                $project: {
                    '_id': 1,
                    'title': 1,
                    'isbn': 1,
                    'number_pages': 1,
                    'summary': 1,
                    'borrowed': 1,
                    'filename': 1,
                    'author_id._id': 1,
                    'author_id.name': 1,
                    'format_id._id': 1,
                    'format_id.name': 1,
                    'genre_id._id': 1,
                    'genre_id.name': 1,
                    'language_id._id': 1,
                    'language_id.name': 1,
                    'user_id._id': 1,
                    'user_id.username': 1,
                    'rank': { $trunc: ['$rank', 0] }
                }
            }
        ])

        return handleResponse.response(res, 200, book[0])
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function saveBook(req, res, next) {
    try {
        const saved = await Book.create(res.locals.data),
            book = await saved.populate('format_id genre_id', 'name').execPopulate();

        res.locals.data = {
            title: book.title,
            genre_id: book.genre_id,
            format_id: book.format_id,
            borrowed: book.borrowed,
            filename: book.filename
        }
        next()
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function uploadFilesToAWS(req, res) {
    try {
        const promises = [],
            { filename } = res.locals.book
            data = {
                key: [
                    'books/pdf',
                    'images/covers'
                ],
                body: [
                    res.locals.book.pdf,
                    res.locals.book.img
                ]
            },
            extensions = ['pdf', 'png'],
            contentType = ['application/pdf', 'image/png'];

        for (let [idx, key] of Object.keys(data).entries()) {
            promises.push(uploadFile({
                Bucket: process.env.BUCKET_NAME,
                Key: `${data.key[idx]}/${filename}.${extensions[idx]}`,
                Body: fs.readFileSync(data.body[idx]),
                ContentType: contentType[idx]
            }))
        }

        await Promise.all(promises)

        data.body.push(res.locals.book.pdfCover)
        deleteFiles(data.body)

        return handleResponse.response(res, 200, res.locals.data, 'El libro se ha guardado correctamente.')
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function updateRankBook(req, res) {
    try {
        const { _id, user_id, qualification } = res.locals.data
        await Book.bulkWrite([
            {
                updateOne: {
                    filter: { _id, 'rank.user_id': user_id },
                    update: { $set: { 'rank.$.qualification': qualification } }
                }
            },
            {
                updateOne: {
                    filter: { _id, 'rank.user_id': { $ne: user_id } },
                    update: { $push: { 'rank': { user_id, qualification } } }
                }
            }
        ])

        return handleResponse.response(res, 200, null, 'La calificación se ha actualizado exitosamente.')
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

function deleteFiles(files) {
    for (let file of files) {
        try {
            fs.unlinkSync(file)
        } catch (error) {
            console.log(error)
        }
    }
}

async function getUrlBook(req, res) {
    try {
        const data = await Book.findOne({
            _id: res.locals.data.book
        }).select('filename')

        const response = `${process.env.API_URL_PDF_BASE}/${data.filename}.pdf`
        return handleResponse.response(res, 200, response, 'Disfruta de la lectura')
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function getRank(req, res) {
    try {
        const data = await Record.aggregate(
            [
                {
                    $match: {
                        start_date: {
                            $gte: new Date(moment.tz('America/Mexico_City').startOf('week').format()),
                            $lte: new Date(moment.tz('America/Mexico_City').endOf('week').format())
                        }
                    },
                },
                {
                    $lookup: {
                        from: 'books',
                        localField: 'book_id',
                        foreignField: '_id',
                        as: 'book_id'
                    }
                },
                {
                    $unwind: '$book_id'
                },
                {
                    $group: {
                        _id: "$book_id",
                        count: {
                            $sum: 1
                        }
                    }
                },
                {
                    $sort: { count: -1 }
                },
                {
                    $limit: 5
                },
                {
                    $project: {
                        '_id._id': 1,
                        '_id.title': 1,
                        '_id.borrowed': 1,
                        '_id.filename': 1
                    }
                },
            ])

        return handleResponse.response(res, 200, data, 'Estos son los libros más populares de la semana')

    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function getResultOfSearch(req, res) {
    try {
        const page = 1,
            term = req.query.book,
            offset = page ? parseInt(page - 1) * process.env.BOOKS_PER_PAGE : 0,
            options = {
                offset,
                limit: process.env.BOOKS_PER_PAGE,
                select: 'title genre_id format_id borrowed filename',
                populate: {
                    path: 'genre_id format_id',
                    select: '_id name'
                }
            }

        const data = await Book.paginate({title: new RegExp(`${term}.*`, 'si')}, options)

        const book = data.docs;
        book.push({ totalPages: data.totalPages, page: data.page })
        console.log(book)
        return handleResponse.response(res, 200, book)

    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

module.exports = {
    getBooks,
    getBook,
    saveBook,
    updateRankBook,
    uploadFilesToAWS,
    getUrlBook,
    getRank,
    getResultOfSearch,
}