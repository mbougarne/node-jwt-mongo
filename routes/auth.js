const Router = require('express').Router()
const authMiddleware = require('../middleware/verifySignUp')
const { signup, signin } = require('../controllers/Login')

Router.post(
    '/signup',
    [
        authMiddleware.checkIfUsernameIsExists,
        authMiddleware.checkIfEmailIsExists,
        authMiddleware.checkIfRoleExists
    ],
    signup
)

Router.post('/signin', signin)

module.exports = Router