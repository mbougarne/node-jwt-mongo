const connect = require('./connect')
const Role = require('../models/Role')

connect().then( () => {

    console.log('Successfully connect to MongoDB')
    initial()

}).catch( error => {

    console.error("Connection error ", error)
    process.exit()

});

const initial = () => {

    Role.estimatedDocumentCount((err, count) => {

        if(!err && count === 0) {
            Role.create(
                [
                    {name: "user"},
                    {name: "moderator"},
                    {name: "admin"}
                ],
                (err) => {
                    if(err)
                    {
                        console.error("There is an error in creating roles ", err)
                    } else {
                        console.log("Roles created!")
                        process.exit();
                    }

                }
            )
        }

    })
}