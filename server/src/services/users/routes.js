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

router.post('/record', [middlewareAuth.validToken, middleware.validBook, middleware.isValidDays, middleware.borrowedBook], controller.createRecord)
router.post('/report', [middlewareAuth.validToken, middleware.validBook, middleware.isValidAccuser, middleware.isValidAccused, middleware.isValidReport], controller.createReport)
router.post('/chat', [middlewareAuth.validToken, middleware.validBook, middleware.isDifferentUser], controller.beginChat)

router.put('/record', [middlewareAuth.validToken, middleware.validBook, middleware.isFree], controller.breakFreeBook)
router.put('/locations', middlewareAuth.validToken, controller.updateLocation)

module.exports = router