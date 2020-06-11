const path = require('path'),
    router = require('express').Router(),
    controller = require(path.join(__dirname, 'controllers')),
    middlewareAuth = require(path.join(__dirname, '..', 'authentication', 'middlewares')),
    middleware = require(path.join(__dirname, 'middlewares'));

router.get('/', controller.getBooks)
router.get('/rank', controller.getRank)
router.get('/search', controller.getResultOfSearch)
router.get('/read/:id', [middlewareAuth.validToken, middleware.userHasBook], controller.getUrlBook)
router.get('/:_id', controller.getBook)

router.post('/', [middlewareAuth.validToken, middleware.validDataBook, middleware.isValidPdf], [controller.saveBook, controller.uploadFilesToAWS])
router.put('/rank', [middlewareAuth.validToken, middleware.validQualificationBook], controller.updateRankBook)

module.exports = router