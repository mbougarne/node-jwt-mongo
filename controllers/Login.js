const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Role = require('../models/Role')
const SECRET_KEY = process.env.JWT_SECRET_KEY

const signup = (req, res) => 
{
    let { username, email, password } = req.body

    User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 8)
    }).then(user => {

        if(!req.body.roles)
        {
            Role.findOne({name: 'user'})
                .then(role => {

                    user.roles = [role._id]
                    user.save( err=> {
                        if(err) {
                            return res.status(500).json({
                                success: false,
                                error_code: 500,
                                massage: error.message
                            })           
                        }

                        return res.status(201).json({
                            success: true,
                            message: "The user has created successfully!"
                        })

                    })

                }).catch(error => {
                    return res.status(500).json({
                        success: false,
                        error_code: 500,
                        massage: error.message
                    })
                })

            user.roles = roles.map(role => role._id)
            user.save( err=> {
                if(err) {
                    return res.status(500).json({
                        success: false,
                        error_code: 500,
                        massage: error.message
                    })           
                }

                return res.status(201).json({
                    success: true,
                    message: "The user has created successfully!"
                })

            })
        }

        return res.status(201).json({
            success: true,
            message: "The user has created successfully!"
        })

    }).catch(error => {
        return res.status(500).json({
            success: false,
            error_code: 500,
            massage: error.message
        })
    })
}

const signin = (req, res) => {

    let username = (validateEmail(req.body.username)) ? 'email' : 'username'

    User.findOne({
        [username]: req.body.username
    }).populate('roles', '-__v').exec(
        (err, user) => {

            if(err) {
                return res.status(500).json({
                    success: false,
                    error_code: 500,
                    massage: JSON.stringify(err.message)
                })
            }

            if(!user) {
                return res.status(500).json({
                    success: false,
                    error_code: 500,
                    massage: "There is no user with that username"
                })
            }

            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

            if(!passwordIsValid) {
                return res.status(401).json({
                    success: false,
                    error_code: 401,
                    massage: "Invalid password!"
                })
            }

            let token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: 3600})
            let authorities = user.roles.map(role => 'ROLE_' + role.name.toUpperCase())

            return res.status(200).json({
                success: true,
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                access_token: token,
                massage: "Welcome!"
            })
        }
    )
}

const validateEmail = username => {
    let email = String(username).trim()

    let rgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return rgx.test(email.toLowerCase());
}

module.exports = {
    signup,
    signin
}