const { Schema } = require('mongoose')

module.exports = new Schema({
    username: {
        type: String,
        required: [true, 'The username is required'],
        index: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'The email is required'],
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
})