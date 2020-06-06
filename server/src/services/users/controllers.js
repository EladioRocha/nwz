const path = require('path'),
    mongoose = require('mongoose'),
    moment = require('moment-timezone'),
    Book = require(path.join(__dirname, '..', '..', 'models', 'Books')),
    Record = require(path.join(__dirname, '..', '..', 'models', 'Records')),
    Chat = require(path.join(__dirname, '..', '..', 'models', 'Chats')),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse'));

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

module.exports = {
    createRecord,
    breakFreeBook,
    createReport,
    beginChat
}