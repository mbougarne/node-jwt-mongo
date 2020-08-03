const { model } = require('mongoose')
const RoleSchema = require('../database/schemas/Role')

module.exports = model( 'Role', RoleSchema )