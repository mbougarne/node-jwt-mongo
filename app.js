const express = require('express')
const cors = require('cors')
const connect = require('./database/connect')

require('dotenv').config()

// Connect to MongoDB
connect().then( () => {
    console.log('Successfully connect to MongoDB')
}).catch( error => {
    console.error("Connection error ", error)
    process.exit()
});


const LoginRoutes = require('./routes/auth')
const UsersRoutes = require('./routes/users')

const app = express()

let corsOptions = {}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.use('/api/auth', LoginRoutes)
app.use('/api/test', UsersRoutes)

// Show 404 on other routes
app.use((req, res) => {
    res.status(404).json({
        status: 404,
        succuss: false,
        path: req.path,
        URI: req.url,
        message: 'Requested resource not found!'
    })
})

module.exports = app