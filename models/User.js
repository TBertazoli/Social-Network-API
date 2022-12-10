const { Schema, model } = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');
const Thought = require('./Thought');


const User = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [isEmail, 'Please fill a valid email address']

        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'

            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },        
        id: false
    }
);

// get total count of comments and replies on retrieval
// PizzaSchema.virtual('friendCount').get(function () {
//     return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
// });

// const Pizza = model('Pizza', PizzaSchema);

module.exports = User;
