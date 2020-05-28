const path = require('path'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    validator = require('validator'),
    User = require(path.join(__dirname, '..', '..', 'models', 'Users'));


function register(req, res, next) {
    try {
        const firstname = validator.escape(req.body.firstname.trim(' ')),
            lastname = validator.escape(req.body.lastname.trim(' ')),
            username = validator.escape(req.body.username.trim(' ')),
            email = validator.escape(req.body.email.trim(' ')).toLowerCase(),
            password = req.body.password.trim(' '),
            confirmPassword = req.body.confirmPassword.trim(' '),
            rol = false,
            optionsLengthUser = {min: 2},
            optionsLengthPassword = {min: 6};

        if(!validator.isLength(firstname, optionsLengthUser) || !validator.isLength(lastname, optionsLengthUser)) {
            return res.status(400).json({data: {message: 'El nombre y apellidos deben contener 2 caracteres o más.', status: 400, statusText: 'Bad Request'}})
        }
        if(!validator.isLength(username, optionsLengthUser)) {
            return res.status(400).json({data: {message: 'El nombre de usuario debe contener 2 caracteres o más.', status: 400, statusText: 'Bad Request'}})
        }
        if(!validator.isEmail(email)) {
            return res.status(400).json({data: {message: 'Correo electronico ingresado invalido.', status: 400, statusText: 'Bad Request'}})
        }
        if(password === confirmPassword) {
            if(!validator.isLength(password, optionsLengthPassword)) {
                return res.status(400).json({data: {message: 'La contraseña debe contener 6 caracteres o más.', status: 400, statusText: 'Bad Request'}})
            }
        } else {
            return res.status(400).json({data: {message: 'Las contraseñas no coinciden', status: 400, statusText: 'Bad Request'}})
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
    }
}

async function existUser(req, res, next) {
    try {
        const email = validator.escape(validator.normalizeEmail(req.body.email.trim(' '))),
            username = validator.escape(req.body.username.trim(' ')).toLowerCase();
        let user = await User.findOne({
            $or: [
                {email},
                {username}
            ]
        })

        if(user) {
            if(user.username === username) {
                return res.status(400).json({data: {message: 'El nombre de usuario ingresado ya ha sido registrado anteriormente.', status: 400, statusText: 'Bad Request'}})
            } else if(user.email === email) {
                return res.status(400).json({data: {message: 'El correo electronico ingresado ya ha sido registrado anteriormente.', status: 400, statusText: 'Bad Request'}})
            }
        }
    
        next()
    } catch (error) {
        console.log(error)
        res.json('error')
    }
}

async function login(req, res, next) {
    try {
        const email = validator.escape(req.body.user).toLowerCase(),
            password = req.body.password;
           
        const data = await User.findOne({
            email,
        }).select('firstname lastname username email password')

        if(!data || !bcrypt.compareSync(password, data.password)) {
            return res.status(400).json({data: {message: 'Nombre de usuario o contraseña incorrectos.', status: 400, statusText: 'Bad Request'}})
        }

        res.locals.data = {_id: data._id, token: generateToken({_id: data._id, firstname: data.firstname, lastname: data.lastname, username: data.username, email: data.email})}
        
        next()
    } catch(error) {
        console.log(error)
        res.json('error')
    } 
}

function generateToken(data) {
    return jwt.sign({
        data
    }, process.env.JWT_SECRET_KEY)
}

module.exports = {
    register,
    login,
    existUser
}