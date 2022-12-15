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

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
// UserSchema.virtual('friendCount').get(function () {
//     return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
// });

// const User = model('User', UserSchema);

module.exports = User;
