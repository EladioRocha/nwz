const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    location_id: {type: mongoose.Types.ObjectId, ref: 'Location'},
    username: {type: String, required: true, minlength: 2, maxlength: 12},
    firstname: {type: String, required: true, minlength: 2, maxlength: 60},
    lastname: {type: String, required: true, minlength: 2, maxlength: 60},
    email: {type: String, required: true, maxlength: 255, unique: true},
    password: {type: String, required: true, minlength: 6, maxlength: 255},
    neighborhood: {type: String, minlength: 2, maxlength: 60},
    street: {type: String, minlength: 2, maxlength: 60},
    house_number: {type: String, maxlength: 4},
    rol: {type: Boolean, required: true, default: false},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('User', UserSchema)