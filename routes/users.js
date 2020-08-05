const Router = require('express').Router()
const auth = require('../middleware/auth')
const users = require('../controllers/users')

Router.get('/all', users.all)
Router.get('/user', [auth.verifyToken], users.user)
Router.get(
    '/mod',
    [
        auth.verifyToken,
        auth.isModerator
    ],
    users.moderator
)
Router.get(
    '/admin',
    [
        auth.verifyToken,
        auth.isAdmin
    ],
    users.admin
)

module.exports = Router