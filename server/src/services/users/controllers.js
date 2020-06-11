const path = require('path'),
    mongoose = require('mongoose'),
    moment = require('moment-timezone'),
    Book = require(path.join(__dirname, '..', '..', 'models', 'Books')),
    Record = require(path.join(__dirname, '..', '..', 'models', 'Records')),
    User = require(path.join(__dirname, '..', '..', 'models', 'Users')),
    Report = require(path.join(__dirname, '..', '..', 'models', 'Reports')),
    Chat = require(path.join(__dirname, '..', '..', 'models', 'Chats')),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse'));
require(path.join(__dirname, '..', '..', 'models', 'StatusReports'))

async function createRecord(req, res) {
    try {
        const {_id, book, userId, days} = res.locals.data,
            currentDate = moment.tz('America/Mexico_City').format(),
            currentTime = moment.tz('America/Mexico_City').format('HH:mm:ss'),
            endDate = moment(currentDate).add(days, 'days');

        await Book.updateOne(
            {_id: mongoose.Types.ObjectId(book)},
            {$set: {borrowed: true}}
        )
        await Record.create({
            lender_id: mongoose.Types.ObjectId(userId),
            borrower_id: mongoose.Types.ObjectId(_id),
            book_id: mongoose.Types.ObjectId(book),
            start_date: currentDate,
            start_time: currentTime,
            end_date: endDate,
            end_time: currentTime
        })
        return handleResponse.response(res, 200, null, "Felicidades. Ya puedes acceder a leer el libro.")
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function breakFreeBook(req, res) {
    try {
        const {_id, book, userId} = res.locals.data,
            currentDate = moment.tz('America/Mexico_City').format(),
            currentTime = moment.tz('America/Mexico_City').format('HH:mm:ss');
            
        await Book.updateOne(
            {_id: mongoose.Types.ObjectId(book)},
            {$set: {borrowed: false}}
        )

        await Record.updateOne(
            {
                lender_id: mongoose.Types.ObjectId(userId),
                borrower_id: mongoose.Types.ObjectId(_id),
                book_id: mongoose.Types.ObjectId(book),
                end_date: {$gte: currentDate} 
            },
            {$set: {end_date: currentDate, end_time: currentTime}}
        )
        return handleResponse.response(res, 200, null, "Libro liberado exitosamente.")
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function createReport(req, res) {
    try {
        const accuser_id = mongoose.Types.ObjectId(res.locals.report.accuser),
            accused_id = mongoose.Types.ObjectId(res.locals.report.accused),
            book_id = mongoose.Types.ObjectId(res.locals.data.book),
            status_id = mongoose.Types.ObjectId(process.env.DEFAULT_STATUS_REPORT),
            problem = res.locals.report.problem;

        await Report.create({
            accuser_id,
            accused_id,
            book_id,
            status_id,
            problem,
            start_date: currentDate = moment.tz('America/Mexico_City').format(),
            start_time: currentTime = moment.tz('America/Mexico_City').format('HH:mm:ss'),
        })
        return handleResponse.response(res, 200, null, 'Tú reporte ha sido enviado con exito.')
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function beginChat(req, res) {
    try {
        const lender_id = mongoose.Types.ObjectId(res.locals.data.userId),
            borrower_id = mongoose.Types.ObjectId(res.locals.data._id),
            book_id = mongoose.Types.ObjectId(res.locals.data.book),
            message = '¡Hola! estoy interesado por adquirir prestado el libro.',
            currentDate = moment.tz('America/Mexico_City').format(),
            currentTime = moment.tz('America/Mexico_City').format('HH:mm:ss');

        await Chat.create({
            lender_id,
            borrower_id,
            book_id,
            message,
            message_date: currentDate,
            message_time: currentTime
        })
        return handleResponse.response(res, 200, null, 'Tú solicitud se ha enviado con exito')
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function myBooks(req, res) {
    try {
        const userId = res.locals.data._id,
            books = await Book.find({user_id: mongoose.Types.ObjectId(userId)}).populate('author_id genre_id language_id', 'name').select('isbn title author_id genre_id number_pages language');

        return handleResponse.response(res, 200, books)
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    } 
}

async function requestedBooks(req, res) {
    try {
        const userId = res.locals.data._id,
            requested = await Record.find({
                $or: [
                    {borrower_id: mongoose.Types.ObjectId(userId)},
                    {lender_id: mongoose.Types.ObjectId(userId)}
                ]
            }
                ).populate(
            [
                {
                    path: 'borrower_id lender_id',
                    select: 'username'
                },
                { 
                    path: 'book_id',
                    select: 'title genre_id format_id',
                    populate: {
                        path: 'genre_id format_id',
                        select: 'name'
                    }
                },
            ]).select('borrower_id lender_id book_id start_date end_date start_time end_time')


        return handleResponse.response(res, 200, requested)
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    } 
}

async function borrowedBooks(req, res) {
    try {
        const userId = res.locals.data._id,
            requested = await Record.find({borrower_id: mongoose.Types.ObjectId(userId)}).populate(
            [
                {
                    path: 'borrower_id',
                    select: 'username'
                },
                { 
                    path: 'book_id',
                    select: 'title genre_id format_id',
                    populate: {
                        path: 'genre_id format_id',
                        select: 'name'
                    }
                },
            ]).select('borrower_id book_id start_date end_date start_time end_time')
            requested.push({
                currentDate: moment.tz('America/Mexico_City').format(),
                currentTime: moment.tz('America/Mexico_City').format('HH:mm:ss')
            })

        return handleResponse.response(res, 200, requested)
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function getReports(req, res) {
    try {
        const userId = mongoose.Types.ObjectId(res.locals.data._id),
            reports = await Report.find({
                $or: [
                    {accuser_id: userId},
                    {accused_id: userId}
                ],
            }).populate(
            [
                {
                    path: 'accuser_id accused_id',
                    select: 'username'
                },
                {
                    path: 'status_id',
                    select: 'name'
                },
                {
                    path: 'book_id',
                    select: 'title'
                }
            ]).select('accuser_id accused_id status_id book_id start_date problem')

        return handleResponse.response(res, 200, reports)
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function updateLocation(req, res) {
    try {
        const country = req.body.country,
            state = req.body.state,
            city = req.body.city,
            neighborhood = req.body.neighborhood,
            street = req.body.street,
            houserNumber = req.body.houseNumber,
            location = {
                country_id: (country) ? mongoose.Types.ObjectId(country) : '',
                state_id: (state) ? mongoose.Types.ObjectId(state) : '',
                city_id: (city) ? mongoose.Types.ObjectId(city) : '',
                neighborhood: (neighborhood) ? neighborhood : '',
                street: (street) ? street : '',
                house_number: (houserNumber) ? houserNumber : ''
            }
        await User.updateOne(
            { _id: mongoose.Types.ObjectId(res.locals.data._id) },
            {
                location
            }
        )
        return handleResponse.response(res, 200, null, 'Tu información se ha actualizado con exito')
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function getLocation(req, res) {
    try {
        const location = await User.findOne(
            { _id: mongoose.Types.ObjectId(res.locals.data._id) },
        ).populate('location.country_id location.state_id location.city_id', 'name').select('location')
        return handleResponse.response(res, 200, location)
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

module.exports = {
    createRecord,
    breakFreeBook,
    createReport,
    beginChat,
    myBooks,
    requestedBooks,
    borrowedBooks,
    getReports,
    updateLocation,
    getLocation
}