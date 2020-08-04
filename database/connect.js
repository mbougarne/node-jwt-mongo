const { connect } = require('mongoose')
const config = require('../database/config')

let connect_link = `mongodb://${config.HOST}:${config.PORT}/${config.DB}`

module.exports = async () => {
    await connect(connect_link, {

        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true 
    
    })
}