const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname: {type: String, required: true, minlength: 2, maxlength: 60},
    lastname: {type: String, required: true, minlength: 2, maxlength: 60},
    username: {type: String, required: true, minlength: 2, maxlength: 12, unique: true},
    email: {type: String, required: true, maxlength: 255, unique: true},
    filename: {type: String, required: true, default: 'default'},
    password: {type: String, required: true, minlength: 6, maxlength: 255},
    rol: {type: Boolean, required: true, default: false},
    token: {type: String},
    last_login: {type: Date},
    location: {
        country_id: {type: mongoose.Types.ObjectId, ref: 'Country'},
        state_id: {type: mongoose.Types.ObjectId, ref: 'State'},
        city_id: {type: mongoose.Types.ObjectId, ref: 'City'},
        neighborhood: {type: String, minlength: 2, maxlength: 60},
        street: {type: String, minlength: 2, maxlength: 60},
        house_number: {type: String, minlength: 1, maxlength: 4}
    },
    created_at: {type: Date, required: true, default: Date.now},
    updated_at: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('User', UserSchema)