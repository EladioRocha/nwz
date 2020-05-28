const path = require('path'),
    User = require(path.join(__dirname, '..', '..', 'models', 'Users'))

async function register(req, res) {
    try {
        await User.create(res.locals.data)
        return res.status(200).json({data: {message: 'Usuario registrado con exito.', status: 200, statusText: 'OK'}})
    } catch (error) {
        console.log(error)
    }
}

async function login(req, res) {
    try {
        const {_id, token} = res.locals.data
        await User.updateOne(
            {_id},
            {token}
        )
    } catch (error) {
        console.log(error)
    }
    res.send('works')
}

module.exports = {
    register,
    login
}