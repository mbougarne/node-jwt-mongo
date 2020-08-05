const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Role = require('../models/Role')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

verifyToken = (req, res, next) => {

    let token = req.headers['x-access-token']

    if(!token) {
        return res.status(401).json({
            success: false,
            error_code: 401,
            message: 'Access token missed!'
        })
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {

        if(err)
        {
            return res.status(500).json({
                success: false,
                error_code: 500,
                message: JSON.stringify(err)
            })
        }

        req.userId = decoded.id
        next()
    })

}


isAdmin = (req, res, next) => {

    User.findById(req.userId)
        .then( user => {

            Role.find(
                {
                    _id: {
                        $in: user.roles
                    }
                }, (err, roles) => {

                    if(err) {
                        return res.status(500).json({
                            success: false,
                            error_code: 500,
                            message: JSON.stringify(err)
                        })
                    }

                    if(!roles.includes('admin'))
                    {
                        return res.status(403).json({
                            success: false,
                            error_code: 403,
                            message: "You're not allowed to access this resource"
                        })
                    }

                    return next()
                }
            )

        }).catch(error => {
            return res.status(500).json({
                success: false,
                error_code: 500,
                message: error.message
            })
        })
}

isModerator = (req, res, next) => {

    User.findById(req.userId)
        .then( user => {

            Role.find(
                {
                    _id: {
                        $in: user.roles
                    }
                },
                (err, roles) => 
                {
                    
                    if(err)
                    {
                        return res.status(500).json({
                            success: false,
                            error_code: 500,
                            message: JSON.stringify(err)
                        })
                    }

                    if(!roles.some(role => role.name == 'moderator'))
                    {
                        return res.status(403).json({
                            success: false,
                            error_code: 403,
                            message: "You're not allowed to access this resource"
                        })
                    }

                    return next()
                }
            )

        }).catch(error => {

            return res.status(500).json({
                success: false,
                error_code: 500,
                message: error.message
            })

        })
}


module.exports = {
    verifyToken,
    isAdmin,
    isModerator   
}
