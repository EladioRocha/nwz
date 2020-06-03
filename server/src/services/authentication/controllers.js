const path = require('path'),
    User = require(path.join(__dirname, '..', '..', 'models', 'Users')),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse'));

async function register(req, res) {
    try {
        await User.create(res.locals.data)
        return handleResponse.response(res, 200, null, 'Usuario registrado con exito.')
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function login(req, res) {
    try {
        const {_id, token} = res.locals.data
        await User.updateOne(
            {_id},
            {token}
        )

        return handleResponse.response(res, 200, res.locals.response, 'Inicio de sesión exitoso.')
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

module.exports = {
    register,
    login
}