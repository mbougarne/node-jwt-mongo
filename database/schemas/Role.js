const { Schema } = require('mongoose')

module.exports = new Schema(
    {
        name: {
            type: String,
            required: [true, 'The role name is required'],
            trim: true,
            lowercase: true
        }
    }, {
        timestamps: true
    }
)