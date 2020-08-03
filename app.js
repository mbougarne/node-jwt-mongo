const express = require('express')
const cors = require('cors')

require('dotenv').config()

const app = express()

let corsOptions = {}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

module.exports = app