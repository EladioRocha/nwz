const path = require('path'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    validator = require('validator'),
    User = require(path.join(__dirname, '..', '..', 'models', 'Users')),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse'));

function register(req, res, next) {
    try {
        const firstname = validator.escape(req.body.firstname.trim(' ')),
            lastname = validator.escape(req.body.lastname.trim(' ')),
            username = validator.escape(req.body.username.trim(' ')),
            email = validator.escape(req.body.email.trim(' ')).toLowerCase(),
            password = req.body.password.trim(' '),
            confirmPassword = req.body.confirmPassword.trim(' '),
            rol = false,
            optionsLengthUser = { min: 2 },
            optionsLengthPassword = { min: 6 };

        if (!validator.isLength(firstname, optionsLengthUser) || !validator.isLength(lastname, optionsLengthUser)) {
            return handleResponse.response(res, 400, null, 'El nombre y apellidos deben contener 2 caracteres o más.')
        }
        if (!validator.isLength(username, optionsLengthUser)) {
            return handleResponse.response(res, 400, null, 'El nombre de usuario debe contener 2 caracteres o más.')
        }
        if (!validator.isEmail(email)) {
            return handleResponse.response(res, 400, null, 'Correo electronico ingresado invalido.')
        }
        if (password === confirmPassword) {
            if (!validator.isLength(password, optionsLengthPassword)) {
                return handleResponse.response(res, 400, null, 'La contraseña debe contener 6 caracteres o más.')
            }
        } else {
            return handleResponse.response(res, 400, null, 'Las contraseñas no coinciden.')
        }

        res.locals.data = {
            firstname,
            lastname,
            username,
            email,
            password: bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT_ROUNDS)),
            rol
        }
        next()
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function existUser(req, res, next) {
    try {
        const email = validator.escape(validator.normalizeEmail(req.body.email.trim(' '))),
            username = validator.escape(req.body.username.trim(' ')).toLowerCase();
        let user = await User.findOne({
            $or: [
                { email },
                { username }
            ]
        })

        if (user) {
            if (user.username === username) {
                return handleResponse.response(res, 400, null, 'El nombre de usuario ingresado ya ha sido registrado anteriormente.')
            } else if (user.email === email) {
                return handleResponse.response(res, 400, null, 'El correo electronico ingresado ya ha sido registrado anteriormente.')
            }
        }

        next()
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function login(req, res, next) {
    try {
        console.log(req.body)
        const email = validator.escape(req.body.email).toLowerCase(),
            password = req.body.password;

        const data = await User.findOne({
            email,
        }).select('firstname lastname username email password filename')

        if (!data || !bcrypt.compareSync(password, data.password)) {
            return res.status(400).json({ data: { message: 'Nombre de usuario o contraseña incorrectos.', status: 400, statusText: 'Bad Request' } })
        }

        const token = generateToken({ _id: data._id, firstname: data.firstname, lastname: data.lastname, username: data.username, email: data.email, filename: data.filename}) 
        res.locals.data = { 
            _id: data._id,
            token
        }

        res.locals.response = {
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            email: data.email,
            filename: data.filename,
            token,
        }

        next()
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

function generateToken(data) {
    try {
        return jwt.sign({
            data
        }, process.env.JWT_SECRET_KEY)
    } catch (error) {
        console.log(error)
    }
}


async function validToken(req, res, next) {
    try {
        const token = getToken(req.headers.authorization)
        if (!validator.isJWT(token)) {
            return handleResponse.response(res, 400, null, 'El token enviado es invalido.')
        }
        const { data } = jwt.verify(token, process.env.JWT_SECRET_KEY)
        res.locals.data = data

        next()
    } catch (error) {
        return handleResponse.response(res, 401, null, 'No tienes una sesión activa, inicie sesión para continuar.')
    }
}

function getToken(header) {
    return header.split(' ').pop()
}

module.exports = {
    register,
    login,
    existUser,
    validToken
}