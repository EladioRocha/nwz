const path = require('path'),
    router = require('express').Router(),
    controller = require(path.join(__dirname, 'controllers')),
    middlewareAuth = require(path.join(__dirname, '..', 'authentication', 'middlewares')),
    middleware = require(path.join(__dirname, 'middlewares'));

router.get('/', controller.getBooks)
router.get('/rank', controller.getRank)
router.get('/search', controller.getResultOfSearch)
router.get('/authors', controller.getAuthors)
router.get('/read/:id', [middlewareAuth.validToken, middleware.userHasBook], controller.getUrlBook)
router.get('/:_id', controller.getBook)

router.post('/', [middlewareAuth.validToken, middleware.validDataBook, middleware.validFormatsBook, middleware.isValidPdf, middleware.isValidImage], [controller.saveBook, controller.uploadFilesToAWS])

router.put('/', [middlewareAuth.validToken, middleware.validDataBook, middleware.getImage, middleware.isValidImage], controller.updateBook)
router.put('/page', [middlewareAuth.validToken], controller.updatePage)
router.put('/rank', [middlewareAuth.validToken, middleware.validQualificationBook], controller.updateRankBook)

router.delete('/', [middlewareAuth.validToken], controller.deleteBook)
module.exports = router