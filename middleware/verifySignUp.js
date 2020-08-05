const { ROLES } = require('../database/config')
const User = require('../models/User')

const checkIfUsernameIsExists = (req, res, next) => {

    User.findOne({
        username: req.body.username
    }).exec( (err, user) => {
        
        if(err) {
            return res.status(500).json({
                success: false,
                error_code: 500,
                message: err.message
            })
        }

        if(user) {
            return res.status(412).json({
                success: false,
                error_code: 412,
                message: "Username already taken!"
            })
        }

        return next()
    })
}


const checkIfEmailIsExists = (req, res, next) => {
    
    User.findOne({
        email: req.body.email
    }).exec( (err, user) => {

        if(err) {
            return res.status(500).json({
                success: false,
                error_code: 500,
                message: err.message
            })
        }

        if(user) {
            return res.status(412).json({
                success: false,
                error_code: 412,
                message: "Email already taken!"
            })
        }

        return next()
    })
}

const checkIfRoleExists = (req, res, next) => {
    if(req.body.roles) 
    {
        for(let i = 0; i < req.body.roles.length; i++)
        {
            if(!ROLES.includes(req.body.roles[i]))
            {
                return res.status(422).json({
                    success: false,
                    error_code: 421,
                    message: `The role ${req.body.roles[i]} doesn't exists!`
                })
            }
        }
    }

    return next()
}

module.exports = {
    checkIfUsernameIsExists,
    checkIfEmailIsExists,
    checkIfRoleExists
}