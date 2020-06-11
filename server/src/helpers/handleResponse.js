const path = require('path')
    responses = require(path.join(__dirname, '..', 'responses.json'));

function response(res, status, data = null, message = null) {
    try {
        return res.status(process.env.STATUS_OK).json({status: status, statusText: responses[status].text, data, message: (status === 500) ? responses[status].message : message})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    response
}