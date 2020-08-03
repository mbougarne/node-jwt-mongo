const { model } = require('mongoose')
const UserSchema = require('../database/schemas/User')

module.exports = model('User', UserSchema)