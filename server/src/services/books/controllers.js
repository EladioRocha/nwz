const path = require('path'),
    mongoose = require('mongoose'),
    Book = require(path.join(__dirname, '..', '..', 'models', 'Books'));

async function saveBook(req, res) {
    try {
        await Book.create(res.locals.data)
        return res.status(200).json({data: {message: 'El libro se ha guardado correctamente.', status: 200, statusText: 'OK'}})
    } catch (error) {
        console.log(error)
        res.json('error')
    }
}

module.exports = {
    saveBook
}