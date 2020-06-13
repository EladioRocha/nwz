const path = require('path'),
    router = require('express').Router(),
    controller = require(path.join(__dirname, 'controllers')),
    middlewareAuth = require(path.join(__dirname, '..', 'authentication', 'middlewares')),
    middleware = require(path.join(__dirname, 'middlewares'));

router.get('/books/requested', middlewareAuth.validToken, controller.requestedBooks)
router.get('/books/borrowed', middlewareAuth.validToken, controller.borrowedBooks)
router.get('/books', middlewareAuth.validToken, controller.myBooks)
router.get('/reports', middlewareAuth.validToken, controller.getReports)
router.get('/locations', middlewareAuth.validToken, controller.getLocation)
router.get('/chats', [middlewareAuth.validToken], controller.getChats)
router.get('/chats/books', [middlewareAuth.validToken], controller.getBooksNoEbooks)
router.get('/chats/:chat', [middlewareAuth.validToken], controller.getMessagesFromChat)

router.post('/record', [middlewareAuth.validToken, middleware.validBook, middleware.isValidDays, middleware.borrowedBook], controller.createRecord)
router.post('/report', [middlewareAuth.validToken, middleware.validBook, middleware.isValidAccuser, middleware.isValidAccused, middleware.isValidReport], controller.createReport)
router.post('/chat', [middlewareAuth.validToken, middleware.validBook, middleware.isDifferentUser], controller.beginChat)

router.put('/record', [middlewareAuth.validToken, middleware.validBook, middleware.isFree], controller.breakFreeBook)
router.put('/locations', middlewareAuth.validToken, controller.updateLocation)
router.put('/picture', [middlewareAuth.validToken, middleware.isValidImg], controller.updatePicture)
router.put('/username', [middlewareAuth.validToken, middleware.isValidUsername, middlewareAuth.existUser], controller.updateUsername)

module.exports = router